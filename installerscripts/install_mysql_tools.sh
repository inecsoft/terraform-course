#!/bin/bash

if [ ! -f $(which wget)  ]; then
    echo "wget tool is installed"
  else
    sudo apt -y install wget
fi

if [ ! -f $(which aptitude)  ]; then
    echo "aptitude tool is installed"
  else
    sudo apt -y install aptitude
fi

version=8.0.23
os_release=`lsb_release -r | awk -F " " '{ print $2 }'`

cd /tmp
sudo aptitude install mysql-workbench -fy
wget https://dev.mysql.com/get/Downloads/MySQLGUITools/mysql-workbench-community_"${version}"-1ubuntu"${os_release}"_amd64.deb

sudo apt-get install -y ./mysql-workbench-community_"${version}"-1ubuntu"${os_release}"_amd64.deb

