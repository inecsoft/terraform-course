#!/bin/bash
sleep 5m

#Install the MySQL server
sudo apt-get -y update
sudo apt-get -y install mysql-server

#sudo mysql_secure_installation utility

#Allow remote access
sudo ufw allow ssh
sudo ufw allow mysql
sudo ufw allow nfs
sudo ufw enable --force

#Start and reboot the MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

sudo cp /etc/mysql/mysql.conf.d/mysqld.cnf /etc/mysql/mysql.conf.d/mysqld.cnf.back

#reasign variables
#private_address=`ifconfig | awk '/inet.[0-9]/&&!/127.0.0.1/ {print $2}'`
sudo bash -c "private_address=`ifconfig | grep inet| head -n 1 | awk -F " " '{print $2}'`;echo bind-address= $private_address >> /etc/mysql/mysql.conf.d/mysqld.cnf"

sudo systemctl restart mysql