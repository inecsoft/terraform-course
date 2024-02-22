#!/bin/env python3
import boto3
from redis import Redis
import logging

logging.basicConfig(level=logging.INFO)

REDIS_URL_PARAM_NAME = "cache-url"

ssm = boto3.client("ssm",region_name='eu-west-1')
param = ssm.get_parameter(Name=REDIS_URL_PARAM_NAME, WithDecryption=True)
value = param['Parameter']['Value']
if ':' not in value:
    logging.info("Could not get host and port from parameter")
    exit()

host, port = value.split(":")

redis = Redis(host=host, port=port, decode_responses=True, ssl=False, username="default")

if redis.ping():
    logging.info("Connected to Redis")