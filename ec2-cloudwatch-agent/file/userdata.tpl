#!/bin/bash
sudo su

sudo yum update -y && sudo yum upgrade -y

# Install CloudWatch Agent
cd /tmp
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
sudo yum install -y amazon-cloudwatch-agent.rpm

if [ -e  /tmp/cloudwatch_agent.json ];  then echo "file exit"; else sleep 30; echo "file does not exist"; fi
cp /tmp/cloudwatch_agent.json /opt/aws/amazon-cloudwatch-agent/bin/cloudwatch_agent.json

# Start CloudWatch Agent
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/bin/cloudwatch_agent.json -s

#To query the status of the CloudWatch agent locally using the command line
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a status

#To stop the CloudWatch agent locally using the command line
#sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -m ec2 -a stop

#sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-config-wizard