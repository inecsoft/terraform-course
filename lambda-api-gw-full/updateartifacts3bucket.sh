#!/bin/bash
cd example
zip ../example.zip main.js
cd ..

aws s3 cp example.zip s3://inecsoft-serverless/v1.0.1/example.zip
#display version uploaded
aws s3 ls s3://inecsoft-serverless

terraform apply -var="app_version=1.0.1"
