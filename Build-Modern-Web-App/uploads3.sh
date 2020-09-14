#!/bin/bash
read -p "Enter bucket name: " REPLACE_ME_BUCKET_NAME
#content-static-web-hosting
echo "Creating bucket with name $REPLACE_ME_BUCKET_NAME"
aws s3 mb s3://$REPLACE_ME_BUCKET_NAME

aws s3 website s3://$REPLACE_ME_BUCKET_NAME --index-document index.html

aws s3api put-bucket-policy --bucket $REPLACE_ME_BUCKET_NAME --policy file://website-bucket-policy.json

aws s3 cp web/index.html s3://$REPLACE_ME_BUCKET_NAME/index.html 