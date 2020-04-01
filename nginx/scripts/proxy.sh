#!/bin/bash

sudo su - root

yum -y update && yum -y upgrade
yum -y install nginx \
               firewall-cmd \
               git \
               curl \
               wget


cp /usr/local/nginx/conf/nginx.conf /usr/local/nginx/conf/nginx.conf.bak

systemctl start nginx
systemctl enable --now nginx

firewall-cmd --add-service=http --permanent
firewall-cmd --reload

