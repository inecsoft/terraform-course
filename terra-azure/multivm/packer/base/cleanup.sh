#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Cleaning up APT caches ***"
apt-get -y -qq autoremove -o=Dpkg::Use-Pty=0
apt-get -y -qq clean -o=Dpkg::Use-Pty=0

echo "*** Cleaning up DHCP leases ***"
rm -rf /var/lib/dhcp/*

echo "*** Cleaning up udev rules ***"
rm -rf /etc/udev/rules.d/70-persistent-net.rules
rm -rf /dev/.udev/
rm -rf /lib/udev/rules.d/75-persistent-net-generator.rules

echo "*** Cleaning /tmp ***"
rm -rf /tmp/*
rm -rf /var/tmp/*