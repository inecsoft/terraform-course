#!/bin/bash
sudo apt-get -y update
sudo apt-get -y install nginx

sleep 5m
sudo su - root
# Install AWS EFS Utilities
apt-get install -y amazon-efs-utils
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
