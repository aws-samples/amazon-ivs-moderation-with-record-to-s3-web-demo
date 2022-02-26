#!/usr/bin/env python3

"""
    This script helps you to automate the creation of helper files and configurations to integrate 
    the front-end and the backend.
"""

import json
from multiprocessing.sharedctypes import Value
import boto3
import os

# Configuration files

CONFIGFILE = 'outputs.json'
DB_SCHEMA = 'ivs_moderation/schemas/db_default.json'
WEB_CONFIG_FILE = '../web-ui/.env'

def create_file(contents):
    ''' Function to create file '''
    
    configs = ''
    for key, val in contents.items() :
        configs = configs + key + '=' + val + '\n'

    try:
        file = open(WEB_CONFIG_FILE, 'w+')
        file.write(configs)
    except Exception as error:
        print(error)
        file.close()
        

def read_file(filename):
    ''' Function to read the files '''
    try:
        file = open(filename, 'r')
        content = file.read()
        file.close()

    except Exception as error:
        print(error)
        raise

    return json.loads(content)


def deploy_db_defaults(dbtable, content):
    ''' Function to deploy default parameters '''

    db = boto3.resource('dynamodb')
    table = db.Table(dbtable)

    for item in ('action', 'alert'):
        try:
            response = table.put_item(
                Item=content[item]
            )

        except Exception as error:
            print(error)
            raise

    return response

def create_web_config_file(contents):
    ''' Function to create the environment file for the UI '''

    for key in contents['ivs-moderation'].keys():
        if str(key).startswith('ivsmoderationapiEndpoint'):
            api_gw_url = key

    web_config = {
        'REACT_APP_IDENTITY_POOL_ID': contents['ivs-moderation']['identitypoolid'],
        'REACT_APP_REGION': contents['ivs-moderation']['region'],
        'REACT_APP_USER_POOL_ID': contents['ivs-moderation']['userpoolsid'],
        'REACT_APP_USER_POOL_WEB_CLIENT_ID': contents['ivs-moderation']['userpoolswebclientid'],
        'REACT_APP_API_GATEWAY': contents['ivs-moderation'][api_gw_url],
        'REACT_APP_AWS_APPSYNC_GRAPHQLENDPOINT': contents['ivs-moderation']['awsappsyncgraphqlEndpoint'],
        'REACT_APP_AWS_APPSYNC_AUTHENTICATIONTYPE': 'AMAZON_COGNITO_USER_POOLS'
    }

    create_file(web_config)

def reset_config_files():
    ''' Resetting the config files '''
    if os.path.isfile(WEB_CONFIG_FILE):
        try:
            os.remove(WEB_CONFIG_FILE)
        except Exception as error:
            print(error)

def main():
    ''' Main Function '''
    config = read_file(CONFIGFILE)
    db_content = read_file(DB_SCHEMA)

    # Finding the settings dbtable from the configuration
    # for item in config:
    settings_table = config['ivs-moderation']['settingsdbtable']

    # deploying the default parameters
    deploy_db_defaults(settings_table, db_content)

    # Creating the web config
    reset_config_files()
    create_web_config_file(config)

# Main function
if __name__ == '__main__':
    main()
