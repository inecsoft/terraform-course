#!/bin/bash

set -ex

sam build
sam validate --lint
sam deploy --guided --profile ivan-arteaga-dev
cd issue-tracker

read -p "enter CDN bucket name: " CDN_BUCKET_NAME
aws s3 ls s3://${CDN_BUCKET_NAME} --profile ivan-arteaga-dev
if [  $? == 0 ]; then
	aws s3 cp .next/static/ s3://$CDN_BUCKET_NAME/\_next/static/ --recursive --profile ivan-arteaga-dev
	aws s3 cp public/ s3://$CDN_BUCKET_NAME/static/ --recursive --profile ivan-arteaga-dev
	cd ..
else
	echo "You need CDN bucket name to deploy his value is: ${CDN_BUCKET_NAME}"
fi
