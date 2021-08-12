""" All services related backend logics are here """
import logging
from datetime import datetime
import os
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

class ApiHandler:
    """ Main class for the rekognition service """

    log = None

    def __init__(self):
        """ Constructor function """

        self.log = logging.getLogger()
        self.log.setLevel(logging.DEBUG)

    def suspend_channel(self, arn):
        """ Function to suspend the channel """

        try:
            ivs_client = boto3.client('ivs')
            if ivs_client.get_stream(channelArn=arn)['stream']['state'] == 'LIVE':
                # Stopping the channel
                ivs_client.stop_stream(channelArn = arn)
            # Get the stream key
            stream_key = ivs_client.list_stream_keys(channelArn = arn)['streamKeys'][0]['arn']
            # Delete the streamkey
            ivs_client.delete_stream_key(arn = stream_key)
            response = 'Channel suspended'
        
        except ClientError as error:
            self.log.error('Server error %s', error)
            response = "Channel suspension failed"
        
        return response

    def send_sns_alert(self, subject, message):
        """ Function to send sns alerts """
        
        sns_client = boto3.client('sns')
        return sns_client.publish(TopicArn=os.environ['SNSTOPIC'],
            Message = message,
            Subject = subject
        )
    
    def update_db_table(self, data, table):
        """ Function to update the ddb table """

        db_client = boto3.resource('dynamodb')
        db_table = db_client.Table(table)

        return db_table.put_item(
            Item=data
        )
    
    def get_data_from_db(self, table, channel_id):
        """ Function to retrevive data from the database table """
        try:
            db_client = boto3.resource('dynamodb')
            db_table = db_client.Table(table)
            return db_table.query(KeyConditionExpression=Key('id').eq(channel_id))
        
        except ClientError as error:
            self.log.error(error)

    def delete_item_from_db(self, table, channel_id, time):
        """ Function to delete items from the table """
        try:
            db_client = boto3.resource('dynamodb')
            db_table = db_client.Table(table)
            return db_table.delete_item(
                Key={
                    'id': channel_id,
                    'time': time
                }
            )
        
        except ClientError as error:
            self.log.error(error)