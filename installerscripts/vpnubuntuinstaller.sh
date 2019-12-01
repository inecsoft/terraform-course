#!/bin/bash

sed 's/managed=false/managed=true' /etc/NetworkManager/NetworkManager.conf
sudo systemctl restart network-manager
sudo apt-get -y install \
   network-manager-openvpn-gnome \
   network-manager-pptp \
   network-manager-pptp-gnome \
   network-manager-strongswan \
   network-manager-vpnc \
   network-manager-vpnc-gnome