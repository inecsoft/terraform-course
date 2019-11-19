#!/bin/bash

sudo apt-get update  -y && sudo apt-get upgrade -y
sudo apt-get install -y  mysql-client wget curl

# Install CloudWatch Agent
cd /tmp
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb 
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb

# Start CloudWatch Agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c /tmp/cloudwatch_agent.json -s
