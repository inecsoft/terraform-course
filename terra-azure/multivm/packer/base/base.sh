#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Cleaning ***"
rm /var/cache/debconf/*.dat
apt-get -y -qq clean

echo "*** Preparing ***"
apt-get -y -qq install -o=Dpkg::Use-Pty=0 --reinstall debconf
dpkg-reconfigure debconf

echo "*** Updating system ***"
UCF_FORCE_CONFFNEW=true
export UCF_FORCE_CONFFNEW
# sed -i 's/console=hvc0/console=ttyS0/' /boot/grub/menu.lst
sed -i 's/LABEL=UEFI.*//' /etc/fstab
apt-get -y -qq update -o=Dpkg::Use-Pty=0
apt-get -y -qq upgrade -o=Dpkg::Use-Pty=0

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

apt-get -y -qq install -o=Dpkg::Use-Pty=0 linux-headers-$(uname -r)

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Configuring permissions ***"
sed -i -e '/Defaults\s\+env_reset/a Defaults\texempt_group=sudo' /etc/sudoers
sed -i -e 's/%sudo  ALL=(ALL:ALL) ALL/%sudo  ALL=NOPASSWD:ALL/g' /etc/sudoers

echo "*** Configuring networks ***"
# Disable DNS reverse lookup
echo "UseDNS no" >> /etc/ssh/sshd_config

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing tools ***"

sudo -H apt-get -qq -y install -o=Dpkg::Use-Pty=0 zip unzip wget curl mc links tree tofrodos cifs-utils smbclient
sudo -H apt-get -qq -y install -o=Dpkg::Use-Pty=0 apt-transport-https ca-certificates software-properties-common

sudo -H apt-get -y -qq install -o=Dpkg::Use-Pty=0 httpie

wget --quiet --no-check-certificate https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -O /usr/bin/jq
chmod a+x /usr/bin/jq