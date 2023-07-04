#! /bin/bash

echo "Check if the system has any configured swap:"
sudo swapon --show

echo "verify that there is no active swap:"
free -h

echo " creating a swap file is with the fallocate program:"
sudo fallocate -l 16G /swapfile

ls -lh /swapfile
echo "mark the file as swap space:"
sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile

sudo swapon --show
free -h

echo "Back up the /etc/fstab:"
sudo cp /etc/fstab /etc/fstab.bak

echo "Add the swap file information to the end of your /etc/fstab:"
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

cat /proc/sys/vm/swappiness

sudo sysctl vm.swappiness=10

#sudo nano /etc/sysctl.conf

cat /proc/sys/vm/vfs_cache_pressure

sudo sysctl vm.vfs_cache_pressure=50
#vm.vfs_cache_pressure=50
echo "add vm.swappiness=10   vm.vfs_cache_pressure=50 in /etc/sysctl.conf "
sudo su
echo -e vm.swappiness=10  \\nvm.vfs_cache_pressure=50 >> /etc/sysctl.conf
exit
