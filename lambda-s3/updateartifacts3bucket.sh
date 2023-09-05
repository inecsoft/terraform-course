#!/bin/bash
cd code
zip ../code.zip lambda-py.py
cd ..

app_version=`date "+%Y%m%d%H%M%S"`

terraform apply -target=aws_s3_bucket.inecsoft-serverless -auto-approve

aws s3 cp lambda-py.zip s3://inecsoft-serverless/$app_version/lambda-py.zip

#Display version uploaded
aws s3 ls s3://inecsoft-serverless

terraform apply -var="app_versions=$app_version" -target=aws_lambda_function.lambda -auto-approve

