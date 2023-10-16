#! /usr/bin/bash

set -ex # stop execution if anything fails

# Add cdn domain address
CDN_DOMAIN="<CDN_DOMAIN>"
LAMBDA_FUNCTION_NAME="<LAMBDA_FUNCTION_NAME>"
LAMBDA_FUNCTION_NAME=`echo var.LAMBDA_FUNCTION_NAME | terraform console`


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

cd $(dirname "$DIR")

echo "Installing node modules"
npm i

echo "Building nextjs application"
npm run build

# Package files for deployment
echo "packaging files"

cp -r public/. .next/standalone/public
cp $file_dir_name/run.sh .next/standalone/


if [ "$1" = "deploy" ]; then
    echo "Running deploy command..."

    echo "provisioning infrastructure"

    cd $file_dir_name/

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

    aws lambda update-function-code --function-name $LAMBDA_FUNCTION_NAME --zip-file fileb://lambda_function_payload.zip 1> /dev/null

    if [ $? -eq 0 ]
    then
      echo "Command executed successfully, continuing to next section."
    else
      echo "There was an error in executing the command."
    fi

    rm -rf lambda_function_payload.zip

    cd $DIR
fi


# move to application folder and sync static files to CDN
echo "syncing static files to S3"

cd ../

# sync static files to S3 + Cloudfront
CDN_DOMAIN=`echo aws_s3_bucket.cdn_bucket.name | terraform console`
aws s3 cp .next/static/ s3://$CDN_DOMAIN/_next/static/ --recursive
aws s3 cp public/ s3://$CDN_DOMAIN/static/ --recursive