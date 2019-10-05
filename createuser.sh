#!/bin/bash
 
sudo hostname
sudo adduser $username --force-badname --disabled-password --gecos $username
sudo usermod -aG ci $username
sudo -H -u $username bash -c ' mkdir -p /home/$username/.ssh'
sudo -H -u $username bash -c 'echo $rsaidpub &gt;&gt; /home/$username/.ssh/authorized_keys'

sudo -H -u $username bash -c 'chmod 600 /home/$username/.ssh/authorized_keys'