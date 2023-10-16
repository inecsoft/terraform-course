#!/bin/bash
set -e
# Build the application using sam build
sam build
# Deploy the application to AWS using sam deploy
sam deploy --stack-name next-lambda-ssr --capabilities CAPABILITY_IAM --resolve-s3 --parameter-overrides NextBucketName=nextjs-lambda-ssr-cdn  --profile ivan-arteaga-dev --region eu-west-1
# Copy the js, css and other static files to s3 bucket
aws s3 cp .aws-sam/build/NextFunction/static/ s3://nextjs-lambda-ssr-cdn/_next/static/ --recursive --profile ivan-arteaga-dev
# Copy the public folder to s3 bucket as Next build dont include public folder during the build process
aws s3 cp public/static s3://nextjs-lambda-ssr-cdn/static/ --recursive --profile ivan-arteaga-dev