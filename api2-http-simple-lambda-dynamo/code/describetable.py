import boto3
import os
import json

client     = boto3.client('dynamodb')
table_name = os.environ['dynamodb_table_id']

def handler(event, context):
    #respose = client.describe_table(TableName='os.environ['dynamodb_table_id']')
    #return response

    body = {
        "message": client.describe_table(TableName=table_name),
        "input": event
    }

    response = {
        "statusCode": 200,
        "body": json.dumps(body)
    }

    return response