#!/bin/bash

sudo yum update -y && yum upgrade -y
sudo yum install -y aws-cli firewalld 

sudo systemctl enable firewalld
sudo systemctl start firewalld 

sudo firewall-cmd --add-service ssh --permanent
sudo firewall-cmd --add-service http --permanent

sudo systemctl restart firewalld
