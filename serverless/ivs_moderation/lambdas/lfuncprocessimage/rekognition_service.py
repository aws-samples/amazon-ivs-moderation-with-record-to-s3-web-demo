""" All services related backend logics are here """
import logging
from datetime import datetime
import os
import boto3
import json
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

class RekognitionService:
    """ Main class for the rekognition service """

    log = None

    moderated_labels=""
    autosuspended_labels=""

    def __init__(self):
        """ Constructor function """

        self.log = logging.getLogger()
        self.log.setLevel(logging.DEBUG)
        # moderation labels
        self.autosuspended_labels = self.grab_settings('action')
        self.moderated_labels = self.grab_settings('alert')

    def suspend_channel(self, arn):
        """ Function to suspend the channel """

        try:
            ivs_client = boto3.client('ivs')

            # Get the stream key
            stream_key = ivs_client.list_stream_keys(
                channelArn=arn)['streamKeys'][0]['arn']

            # Stopping the channel
            ivs_client.stop_stream(channelArn = arn)

            # Delete the streamkey
            ivs_client.delete_stream_key(arn=stream_key)
        
            status = {
                'status': 'suspended',
                'time': datetime.utcnow().isoformat()
            }
        
        except ClientError as error:
            self.log.error("Server error: %s", error)
            status = "Channel suspension failed"

        return status

    def check_moderate_policies(self, labels):
        """ Strip out the space in the response and prepare the content """

        # Status change decides whether the channel needs to be suspend quickly
        # or needs to be passed to the moderation queue
        # suspend = 'suspend' / suspend = 'moderate'

        status = None

        for label in labels:
            modified_label = label['Name'].replace(" ", "_").lower()
            self.log.debug("Label %s translated to %s", label, modified_label)

            if modified_label in self.autosuspended_labels and self.autosuspended_labels[modified_label] is not '0':
                if (label['Confidence'] >= float(self.autosuspended_labels[modified_label])):
                    if status:
                        self.log.info('Status is already set with %s', status)
                    else:
                        status = 'suspend'
                        self.log.info('Label: %s, is in autosuspended list, %s', label['Name'], label['Confidence'])
                else:
                    self.log.info("The label %s is below autosuspend threshold, %s", label['Name'], label['Confidence'])
            
            elif modified_label in self.autosuspended_labels and self.autosuspended_labels[modified_label] != '0':
                self.log.info("Auto suspension is disabled for label %s", modified_label)
            
            else:
                self.log.info("Label %s is not defined.", modified_label)

            if modified_label in self.moderated_labels and status is None:
                
                if self.autosuspended_labels[modified_label] is '0':
                    autosuspension_disabled = 1
                else: 
                    autosuspension_disabled = 0

                if (label['Confidence'] >= float(self.moderated_labels[modified_label])) and (label['Confidence'] < float(self.autosuspended_labels[modified_label])) and (self.moderated_labels[modified_label] != '0') and (autosuspension_disabled is 0):
                    if status:
                        self.log.debug('Status is already set with %s', status)
                    else:
                        status = 'moderate'
                        self.log.info("Label: %s is in moderated list, %s", label['Name'], label['Confidence'])
                elif (label['Confidence'] >= float(self.moderated_labels[modified_label])) and (self.moderated_labels[modified_label] != '0') and (autosuspension_disabled is 1):
                    if status:
                        self.log.debug("Status is already set with %s", status)
                    else:
                        status = 'moderate'
                        self.log.info("Label: %s is in moderated list, %s", label['Name'], label['Confidence'])
                else:
                    self.log.info("The label %s is below moderated label threshold, %s", label['Name'], label['Confidence'])
            
            else:   
                self.log.info("Label %s is not in the moderated or restricted list", label['Name'])

        return status

    def create_moderation_job(self, bucket, key):
        """ Generate content moderation job """

        client = boto3.client('rekognition')
        response = client.detect_moderation_labels(
            Image={
                'S3Object': {
                    'Bucket': bucket,
                    'Name': key
                }
            },
            MinConfidence=50
        )
        return response['ModerationLabels']

    def send_sns_alert(self, subject, message):
        """ Function to send sns alerts """

        sns_client = boto3.client('sns')
        return sns_client.publish(TopicArn=os.environ['SNSTOPIC'],
                                  Message=message,
                                  Subject=subject
                                  )

    def update_db_table(self, data, table):
        """ Function to update the ddb table """

        db_client = boto3.resource('dynamodb')
        db_table = db_client.Table(table)

        return db_table.put_item(
            Item=data
        )
    
    def get_item_from_db_table(self, table, key):
        """ Function to get item from the dbtable """

        try:
            db_client = boto3.resource('dynamodb')
            db_table = db_client.Table(table)
            return db_table.query(KeyConditionExpression=Key('id').eq(key))
        
        except ClientError as error:
            self.log.error(error)

    def get_playback_url(self, arn):
        """ Get playback url from the ivs console """

        try:
            ivs_client = boto3.client('ivs')
            response = ivs_client.get_channel(arn=arn)
            self.log.debug("IVS_GET_CHANNEL: %s", json.dumps(response))
            return response['channel']['playbackUrl']
        
        except ClientError as error:
            self.log.error(error)
        
    def grab_settings(self, id):
        """ Function to get settings details from the db """

        settings_table_name = os.environ['SETTINGSTABLE']

        try:
            db_client = boto3.resource('dynamodb')
            settings_table = db_client.Table(settings_table_name)
            response = settings_table.get_item(Key={
                'id': id
            })
            # Cleanup unwanted items
            mod_labels = response['Item']
            del mod_labels['id']
            del mod_labels['__typename']
            del mod_labels['updatedAt']
            self.log.debug("Settings for action %s: %s", id, json.dumps(mod_labels))
            return mod_labels

        except ClientError as error:
            self.log.error(error)




