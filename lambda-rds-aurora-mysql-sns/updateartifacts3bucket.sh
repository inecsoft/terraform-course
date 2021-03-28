#!/bin/bash
cd code
#zip containing all the files in the current directory including the hidden files (files starting with a dot):
zip ../code.zip .* *
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
app_version=`date "+%Y%m%d%H%M%S"`

terraform apply -var="app_versions=$app_version" -target=aws_s3_bucket.inecsoft-serverless -auto-approve

aws s3 cp code.zip s3://inecsoft-serverless/$app_version/code.zip
#display version uploaded
aws s3 ls s3://inecsoft-serverless

terraform apply -var="app_versions=$app_version" -target=aws_lambda_function.lambda-function -auto-approve

echo $app_versiosn > last_app_versions 
