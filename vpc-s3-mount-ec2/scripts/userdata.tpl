#!/bin/bash

set -ex 

if [ ! -z `which yum` ]; then
  sudo yum update -y
  sudo yum install -y automake fuse fuse-devel gcc-c++ git libcurl-devel libxml2-devel make openssl-devel
else
  sudo apt-get update -y
  sudo apt-get install -y automake autotools-dev fuse g++ git libcurl4-gnutls-dev libfuse-dev libssl-dev libxml2-dev make pkg-config
fi

#Download s3fs source code from git.
git clone https://github.com/s3fs-fuse/s3fs-fuse.git

#Now Compile and install the code.
cd s3fs-fuse
bash autogen.sh
bash configure --prefix=/usr --with-openssl
make
sudo make install

#test 
which s3fs

export DEVICE_FS="${DEVICE_FS}"
export AWS_REGION="${AWS_REGION}"
export S3FS_BUCKET_NAME="${S3FS_BUCKET_NAME}"
export S3FS_MOUNTING_ROLE="${S3FS_MOUNTING_ROLE}"
echo $S3FS_MOUNTING_ROLE >> test.txt
#Now create a directory or provide the path of an existing directory and mount S3bucket in it
sudo mkdir -p /var/$DEVICE_FS

#Now mount the s3 bucket using IAM role enter following command
s3fs $S3FS_BUCKET_NAME /var/$DEVICE_FS -o iam_role="$S3FS_MOUNTING_ROLE" -o url="https://s3-$AWS_REGION.amazonaws.com" -o endpoint=$AWS_REGION -o allow_other -o use_cache=/tmp $S3FS_BUCKET_NAME /var/$DEVICE_FS -o dbglevel=info -f -o curldbg

#s3fs  default-vpc-s3-mount-ec2-s3-bucket-mount /var/default-vpc-s3-mount-ec2-s3-bucket-mount -o use_cache=/tmp -o allow_other -o iam_role="default-vpc-s3-mount-ec2-iam-ec2-role" -o url="https://s3-eu-west-1.amazonaws.com" -o endpoint=eu-west-1 -o dbglevel=info -f -o curldbg

# # Edit fstab so s3fs automatically loads on reboot
echo $S3FS_BUCKET_NAME /var/$S3FS_BUCKET_NAME fuse.s3fs _netdev,allow_other,use_cache=/tmp,iam_role=$S3FS_MOUNTING_ROLE,endpoint=$AWS_REGION,url="https://s3-$AWS_REGION.amazonaws.com" 0 0 >> /etc/fstab

# install docker
curl https://get.docker.com | bash

