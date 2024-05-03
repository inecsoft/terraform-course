#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Configuring locales ***"
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale-gen en_US.UTF-8
dpkg-reconfigure locales

echo "*** Installing Docker ***"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get -y -qq update -o=Dpkg::Use-Pty=0
apt-get -y -qq install -o=Dpkg::Use-Pty=0 docker-ce
usermod -aG docker "$(logname)"

cp /tmp/files/daemon.json /etc/docker

echo "*** Installing Docker Compose ***"
su -c "curl -sSL https://github.com/docker/compose/releases/download/1.24.0/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose"
chmod +x /usr/local/bin/docker-compose

echo "*** Checking Docker installation ***"
docker-compose version
docker info