#!/bin/bash

sudo su - root
# Install AWS EFS Utilities
sudo setenforce 0
yum install -y amazon-efs-utils
if [  $? != 0  ]; then
  yum install -y git make
  cd /tmp
  git clone https://github.com/aws/efs-utils
  cd efs-utils
  yum -y install rpm-build
  make rpm
  yum -y install build/amazon-efs-utils*rpm
  # Mount EFS
  mkdir /efs
  efs_id="${efs_id}"
  echo $efs_id >> efs_id
  mount -t efs $efs_id:/ /efs
  # Edit fstab so EFS automatically loads on reboot
  echo $efs_id:/ /efs efs defaults,_netdev 0 0 >> /etc/fstab

else 
  # Mount EFS
  mkdir /efs
  efs_id="${efs_id}"
  mount -t efs $efs_id:/ /efs
  # Edit fstab so EFS automatically loads on reboot
  echo $efs_id:/ /efs efs defaults,_netdev 0 0 >> /etc/fstab

fi
sudo setenforce 1