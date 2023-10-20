#!/bin/bash

set -xe

LAMBDA_FUNCTION_NAME=`echo var.LAMBDA_FUNCTION_NAME | terraform console`
CDN_DOMAIN=nextjsapptfgm


if [ "$1" = 0 ]; then
    echo "No arguments provided. Please provide 'deploy' or 'sync' as an argument."
    exit 1
fi

if [ "$1" != "deploy" ] && [ "$1" != "sync" ]; then
    echo "Invalid argument. Please provide 'deploy' or 'sync' as an argument."
    exit 1
fi

# get the absolute file path
SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done

DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )

file_dir_name=$(basename "$DIR")

# cd $(dirname "$DIR")

echo show DIR value

cd nextjs-zip/app/
echo "Installing node modules"
npm i

echo "Building nextjs application"
npm run build

if [ "$1" = "deploy" ]; then
    echo "Running deploy command..."

    echo "provisioning infrastructure"

    cd $DIR

    if [ ! -d ".terraform" ]
    then
        echo "Terraform has not been initialized. Initializing now..."
        terraform init
    else
        echo "Terraform is already initialized"
    fi

    terraform validate
    terraform apply -auto-approve

elif [ "$1" = "sync" ]; then
    echo "Running sync command..."

    cd .next/standalone/

    zip -r -q lambda_function_payload.zip .

    echo "This might take a while..."

    aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://lambda_function_payload.zip --profile ivan-arteaga-dev 1> /dev/null

    if [ $? -eq 0 ]
    then
      echo "Command executed successfully, continuing to next section."
    else
      echo "There was an error in executing the command."
    fi

    rm -rf lambda_function_payload.zip

    cd $DIR
fi

# echo "syncing static files to S3"

# cd nextjs-zip/app/

# # sync static files to S3 + Cloudfront
# echo $CDN_DOMAIN
# aws s3 cp .next/static/ s3://$CDN_DOMAIN/_next/static/ --recursive --profile ivan-arteaga-dev
# aws s3 cp public/ s3://$CDN_DOMAIN/static/ --recursive --profile ivan-arteaga-dev