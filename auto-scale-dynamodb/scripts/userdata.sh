#!/usr/bin/env bash
# Helper function

s3_bucket_name="${s3_bucket_name}"
aws_region="${aws_region}"

log(){
    timenow=`date +%Y-%m-%dT%H:%M:%S.%N`
    echo "$timenow: $1" >> $INSTALLER_LOG_FILE_LOCATION
}

backup_file_locally(){
  FILE=$1
  BACKUP_FILE_NAME=$FILE.`date +"%Y.%m.%d.%H.%M.%S.%N".backup`
  mv $FILE "$FILE.`date +"%Y.%m.%d.%H.%M.%S.%N".backup`"
  log "Backed up $FILE to $BACKUP_FILE_NAME"
}
error_exit(){
  log "$1"

#--exit-code|-e exit.code 
#--reason|-r resource.status.reason

sudo service dynamic-dynamodb stop
  exit 1
}
INSTALLER_LOG_FILE_LOCATION=/etc/dynamic-dynamodb/logs/installer.log
mkdir -p /etc/dynamic-dynamodb/{scripts,logs} || error_exit 'Failed to create /etc/dynamic-dynamodb'
sudo service dynamic-dynamodb start || error_exit 'Failed in starting dynamic-dynamodb Check logs at /var/log/cfn-init.log'

if [[ -f $INSTALLER_LOG_FILE_LOCATION ]]; then
  backup_file_locally $INSTALLER_LOG_FILE_LOCATION
fi

easy_install pip || error_exit 'Failed to install pip'
log "Installed pip"
echo "dynamic-dynamodb>=2.0.0,<3.0.0">/etc/dynamic-dynamodb/requirements.txt
/usr/local/bin/pip install -U -r /etc/dynamic-dynamodb/requirements.txt || error_exit 'Failed to install dynamic-dynamodb package from pip repository'
log "Installed dynamic-dynamodb"


mkdir -p ~/.aws || error_exit 'Failed to create /home/root/.aws'
cp /home/ec2-user/.aws/config ~/.aws/config
echo "aws s3 cp /etc/dynamic-dynamodb/dynamic-dynamodb.conf s3://$s3_bucket_name/dynamic-dynamodb.conf --region $aws_region || (echo 'Failed to upload /etc/dynamic-dynamodb/dynamic-dynamodb.conf to s3://$s3_bucket_name/' ; exit 1)">/etc/dynamic-dynamodb/scripts/upload-config-to-s3.sh || error_exit 'Failed to create /etc/dynamic-dynamodb/scripts/upload-config-to-s3.sh'
sh /etc/dynamic-dynamodb/scripts/init_config_file.sh /etc/dynamic-dynamodb/dynamic-dynamodb.conf s3://$s3_bucket_name/ $INSTALLER_LOG_FILE_LOCATION  || error_exit 'Failed to initialize config file'
sudo service dynamic-dynamodb start || error_exit 'Failed to start dynamic-dynamodb service. Check /etc/dynamic-dynamodb/logs/service.log'
log "Dynamic dynamodb service started"
# All is well so signal success

# /opt/aws/bin/cfn-signal -e 0 -r "Dynamic DynamoDB instance setup complete" 'https://cloudformation-waitcondition-eu-west-1.s3-eu-west-1.amazonaws.com/arn%3Aaws%3Acloudformation%3Aeu-west-1%3A895352585421%3Astack/dynamo/34d7fff0-2aaa-11eb-8ca7-06e6c909f94e/WaitHandle?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201119T210012Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86399&X-Amz-Credential=AKIAJRBFOG6RPGASDWGA%2F20201119%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Signature=fb52a816644a48ffcb8de6297fff7cf793c9b2f866ccd0f07fc144f85f6f8a4b'
