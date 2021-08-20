''' Main lambda function to handle all image processing related workflows '''
import logging
import json
import os
from lib.rekognition_service import RekognitionService
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

rekognition = RekognitionService()

def updatedb(item, dbtable, message, notify):
    
    response = rekognition.update_db_table(item, dbtable)
    # Clean-up any entry from the moderate_state db table if any
    # Send the review results to the admin email address
    if notify:
        rekognition.send_sns_alert(
        message, json.dumps(item, sort_keys=True, indent=4))
    logger.info('DB update is successful.')
    logger.debug(response)

def stream_moderation_service(bucket, key, event):
    """ Function to manage the moderation job """
    # Initiating the rekognition job
    rekognition_response = rekognition.create_moderation_job(bucket, key)
    logger.debug("Response from Rekognition: %s", rekognition_response)

    # verifying the rekognition response against the policies
    verify_policies_response = rekognition.check_moderate_policies(
        rekognition_response)
    logger.info("Moderation status: %s", verify_policies_response)

    channel_region = event['Records'][0]['awsRegion']

    # GA Path
    channel_id = event['Records'][0]['s3']['object']['key'].split('/')[3]
    account_id = event['Records'][0]['s3']['object']['key'].split('/')[2]

    # Time
    event_time = event['Records'][0]['eventTime']

    channel_arn = 'arn:aws:ivs:' + channel_region + \
        ':' + account_id + ':channel/' + channel_id
    playback_url = rekognition.get_playback_url(channel_arn)
    logger.debug("Channel arn: %s", channel_arn)

    if 'result' in verify_policies_response and verify_policies_response['result'] == 'suspend':
        suspension_status = rekognition.suspend_channel(channel_arn)
        logger.info("Channel %s is %s", channel_arn, suspension_status['status'])
        # Preparing review status message for db and email
        review_result = {
            'id': channel_arn,
            'user': 'reko',
            'playback_url': playback_url,
            'flagged_images': 'https://' + os.environ['CFDOMAIN'] + '/' + key,
            'review': 'auto',
            'status': 'suspended',
            'time': suspension_status['time'],
        }
        review_result['moderation_results'] = verify_policies_response['moderation_results']
        logger.info("Review result: %s", json.dumps(review_result))
        # Update the db
        dbtable = os.environ['STATUSTABLE']
        message = "Channel is suspended"
        updatedb(review_result, dbtable, message, notify=True)

    elif 'result' in verify_policies_response and verify_policies_response['result'] == "moderate":
        # Check if the db entry is already there in the moderated table if so just update the flagged image status
        # Else just update a new item in the db
        # updatedb
        logger.info("Playbackurl: %s", playback_url)

        items_to_be_reviewed = {
            'id': channel_arn,
            'playback_url': playback_url,
            'time': datetime.utcnow().isoformat(),
            'num_flagged_images': '1',
            'flagged_images': [ 
                {
                    'url': 'https://' + os.environ['CFDOMAIN'] + '/' + key,
                    'time': event_time,
                    'moderation_results': []
                }
            ]
        }
        items_to_be_reviewed['flagged_images'][0]['moderation_results'] = items_to_be_reviewed['flagged_images'][0]['moderation_results'] + verify_policies_response['moderation_results']
        logger.debug("Items to be reviewed: %s",
                     json.dumps(items_to_be_reviewed))
        dbtable = os.environ['REVIEWTABLE']

        # Check channel data is already in the table
        data = rekognition.get_item_from_db_table(dbtable, channel_arn)
        logger.debug("Data: %s", json.dumps(data['Items']))

        # SNS message to the admins
        message = "A new channel is added for moderation"

        if data['Items']:
            logger.info("Data is already in the db")
            logger.debug("Data from the db: %s", json.dumps(data['Items']))
            
            data['Items'][0]['flagged_images'].append(items_to_be_reviewed['flagged_images'][0])
            data['Items'][0]['num_flagged_images'] = str(int(data['Items'][0]['num_flagged_images']) + 1)
            logger.debug("Updated data: %s", json.dumps(data['Items']))
            updatedb(data['Items'][0], dbtable, message, notify=False)

        else:
            updatedb(items_to_be_reviewed, dbtable, message, notify=True)
    
    else:
        logger.debug("Image passed the test")


def handler(event, context):
    ''' Main handler function '''

    logger.debug(event)

    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    logger.info('Bucket: %s', bucket)
    logger.info('Key: %s', key)

    stream_moderation_service(bucket, key, event)