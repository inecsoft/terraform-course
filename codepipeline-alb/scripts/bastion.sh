#!/bin/bash

sudo su - ec2-user
echo -e "Host * \n StrictHostKeyChecking no" > ~/.ssh/config

sudo su - root
sudo yum update -y
sudo setenforce 0

#install packages
sudo yum install -y  wget \
                     vim-enhanced \
                     python2 \
                     python36 \
                     git \
                     postgresql12 \
                     postgresql12-server \
                     postgresql12-contrib \
                     firewalld \
                     httpd \
                     mod_wsgi mod_ssl
                     psacct \
                     epel-release \
                     fail2ban
                     

sudo echo "alias vi='vim'" >> /etc/profile
sudo source /etc/profile
sudo alternatives --set python /usr/bin/python3
sudo /usr/pgsql-12/bin/postgresql-12-setup initdb

sudo systemctl start postgresql-12
sudo systemctl enable postgresql-12

sudo systemctl start firewalld
sudo systemctl enable firewalld

sudo systemctl start psacct
sudo systemctl enable psacct

systemctl start fail2ban
systemctl enable fail2ban

sudo firewall-cmd --permanent --add-service=nfs
sudo firewall-cmd --permanent --add-service=postgresql
sudo firewall-cmd --permanent --add-service=ssh

sudo firewall-cmd --reload

sudo setenforce 1