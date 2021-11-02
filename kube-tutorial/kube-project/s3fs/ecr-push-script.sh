#!/bin/bash
set -x

tag=$(date "+%y%m%d%H%M")
read -p  'Entre the ECR repo name: ' repo_name
read -p  'Entre the AWS region: ' region

if [ -z "$region" ]
then region="eu-west-1"
fi

account=$(aws sts get-caller-identity --query 'Account' --output text)
# eu-west-1
aws ecr get-login-password --region $region | docker login --username AWS --password-stdin $account.dkr.ecr.eu-west-1.amazonaws.com
docker build -t $repo_name .
docker tag $repo_name:latest $account.dkr.ecr.eu-west-1.amazonaws.com/$repo_name:latest
docker tag $repo_name:latest $account.dkr.ecr.eu-west-1.amazonaws.com/$repo_name:$tag
docker push $account.dkr.ecr.eu-west-1.amazonaws.com/$repo_name:latest
docker push $account.dkr.ecr.eu-west-1.amazonaws.com/$repo_name:$tag