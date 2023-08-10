#!/bin/bash

sudo yum update -y
sudo yum upgrade -y
sudo yum install -y https://s3.amazonaws.com/ec2-downloads-windows/SSMAgent/latest/linux_amd64/amazon-ssm-agent.rpm

export DEVICE_FS="${DEVICE_FS}"
export AWS_REGION="${AWS_REGION}"
export S3FS_BUCKET_NAME="${S3FS_BUCKET_NAME}"
export S3FS_MOUNTING_ROLE="${S3FS_MOUNTING_ROLE}"
echo $S3FS_MOUNTING_ROLE >> test.txt
#Now create a directory or provide the path of an existing directory and mount S3bucket in it
sudo mkdir -p /var/$DEVICE_FS

#mount -t nfs -o nolock,hard DEVICE_IP:/dev-ec2-storage-gateway-storagegateway_nfs_file_share /var/$DEVICE_FS

#check if the s3 bucket is mounted
df -hT

cd /var/$DEVICE_FS
echo "test" >> test.txt


