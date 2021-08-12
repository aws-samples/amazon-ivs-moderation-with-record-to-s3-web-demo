""" Lambdafunction to handle API calls """
import awsgi
from lib.api_handler import ApiHandler
import logging
import json
import os
from datetime import datetime

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

from flask import (
    Flask,
    request
    )

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)
api = ApiHandler()

@app.route("/api")
def index():
    """ Main index page """
    response = {
        'status': 'success!!!'
    }
    return (response, 200)

@app.route("/api/channel", methods=["POST"])
def manage_channel():
    """ Function to stop the channel """
    body = request.json
    logger.debug("Event body: %s", body)

    # CORS
    header = {
        'Access-Control-Allow-Headers': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST"'
    }
    
    REVIEW_TABLE = os.environ['REVIEWTABLE']
    LEDGER_TABLE = os.environ['STATUSTABLE']

    if body['action'] == 'stop':
        channel_response = api.suspend_channel(body['arn'])
        logging.info(channel_response)
        # return (response['message'], response['statuscode'], header)
        # Get the data from the review table
        data = api.get_data_from_db(REVIEW_TABLE, body['arn'])
        time = data['Items'][0]['time']
        logging.debug("Data from the table: %s", data)
        item = data['Items'][0]
        item['user'] = body['user']
        item['review'] = 'manual'
        item['status'] = 'suspended'
        item['time'] = datetime.utcnow().isoformat()
        logging.debug("Updated data: %s", json.dumps(item))
        # Update the ledger table
        update_table_response = api.update_db_table(item, LEDGER_TABLE)
        logging.info("Ledger table update: %s", update_table_response)
        # Delete the entry from the review table
        delete_item_response = api.delete_item_from_db(REVIEW_TABLE, body['arn'], time)
        logging.debug("Delete data: %s", json.dumps(delete_item_response))
        # Send email to the admins
        api.send_sns_alert("Channel is suspended", json.dumps(item, sort_keys=True, indent=4))
        return('Channel stopped', 200, header)

    elif body['action'] == 'reprieve':
        data = api.get_data_from_db(REVIEW_TABLE, body['arn'])
        time = data['Items'][0]['time']
        logging.debug("Data from the table: %s", data)
        item = data['Items'][0]
        item['user'] = body['user']
        item['review'] = 'manual'
        item['status'] = 'reprieved'
        item['time'] = datetime.utcnow().isoformat()
        logging.debug("Updated data: %s", item)
        # Update the ledger table
        update_table_response = api.update_db_table(item, LEDGER_TABLE)
        logging.info("Ledger table update: %s", update_table_response)
        # Delete the entry from the review table
        delete_item_response = api.delete_item_from_db(REVIEW_TABLE, body['arn'], time)
        logging.debug("Delete data: %s", json.dumps(delete_item_response))
        # Send email to the admins
        api.send_sns_alert('Channel removed from the review list', json.dumps(item, sort_keys=True, indent=4))
        return('Channel unlisted', 200, header)
    
    else:
        return('Server error', 500, header)

def handler(event, context):
    """ Main handler function """
    logger.debug("API Call: %s", json.dumps(event))
    return awsgi.response(app, event, context)

    