#!/bin/bash

#display version uploaded
aws s3 ls s3://inecsoft-serverless | grep -Eo [0-9]\{10}

read -p "Enter the version that you want to roll back to form the list: " app_version
echo -e "The version selected was $app_version. \n"

terraform apply -var="app_version=$app_version" -auto-approve
echo $app_version > last_app_version 
