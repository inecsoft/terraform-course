#!/bin/bash -xe
# Install the SSM agent.
cd /tmp
curl https://amazon-ssm-${AWS_REGION}.s3.amazonaws.com/latest/linux_amd64/amazon-ssm-agent.rpm -o amazon-ssm-agent.rpm
sudo yum install -y amazon-ssm-agent.rpm

sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent