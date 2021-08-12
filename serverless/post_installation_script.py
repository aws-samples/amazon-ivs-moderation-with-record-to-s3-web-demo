#!/usr/bin/env python3

import json
import boto3

CONFIGFILE = 'outputs.json'
DB_SCHEMA = 'ivs_moderation/schemas/db_default.json'


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


def main():
    ''' Main Function '''
    config = read_file(CONFIGFILE)
    db_content = read_file(DB_SCHEMA)

    # Finding the settings dbtable from the configuration
    for item in config:
        settings_table = config[item]['settingsdbtable']

    deploy_db_defaults(settings_table, db_content)


# Main function
if __name__ == '__main__':
    main()
