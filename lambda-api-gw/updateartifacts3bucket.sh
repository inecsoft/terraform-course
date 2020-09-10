#!/bin/bash
cd code
zip ../code.zip main.js
cd ..

app_version=`date "+%y%m%d%H%M"`

terraform apply -var="app_version=$app_version" -target=aws_s3_bucket.inecsoft-serverless -auto-approve

aws s3 cp code.zip s3://inecsoft-serverless/$app_version/code.zip
#display version uploaded
aws s3 ls s3://inecsoft-serverless

terraform apply -var="app_version=$app_version"
echo $app_version > last_app_version 
