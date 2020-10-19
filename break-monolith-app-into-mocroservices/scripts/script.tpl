#!/bin/bash
sudo yum -y update


sleep 5m
sudo su - root
yum install -y aws-cfn-bootstrap 
echo "ECS_CLUSTER=${cluster_name}" >> /etc/ecs/ecs.config
start ecs

# Install AWS EFS Utilities
yum install -y amazon-efs-utils
# Mount EFS
mkdir /efs
efs_id="${efs_id}"
mount -t efs $efs_id:/ /efs
# Edit fstab so EFS automatically loads on reboot
echo $efs_id:/ /efs efs defaults,_netdev 0 0 >> /etc/fstab

cd /tmp
apt-get install -y wget curl
wget https://s3.amazonaws.com/amazoncloudwatch-agent/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
