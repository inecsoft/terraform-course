#!/bin/bash 

set -ex

sam build
sam validate --lint
sam deploy --guided --profile ivan-arteaga-dev
cd issue-tracker
aws s3 cp .next/static/ s3://$CDN_DOMAIN/\_next/static/ --recursive --profile ivan-arteaga-dev
aws s3 cp public/ s3://$CDN_DOMAIN/static/ --recursive --profile ivan-arteaga-dev
cd ..