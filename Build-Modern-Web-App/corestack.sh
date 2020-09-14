#!/bin/bash

aws cloudformation create-stack --stack-name MythicalMysfitsCoreStack --capabilities CAPABILITY_NAMED_IAM --template-body file://core.yml

sleep 10m &
aws cloudformation describe-stacks --stack-name MythicalMysfitsCoreStack

