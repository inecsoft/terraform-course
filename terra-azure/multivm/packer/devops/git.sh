#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Git ***"
apt-add-repository ppa:git-core/ppa
apt-get -y -qq update -o=Dpkg::Use-Pty=0
apt-get -y -qq install -o=Dpkg::Use-Pty=0 git
apt-get -y -qq install -o=Dpkg::Use-Pty=0 openssh-client

echo "*** Checking Git version ***"
git version

echo "*** Installing Transcrypt ***"
git clone --progress --verbose --branch v1.1.0 https://github.com/elasticdog/transcrypt.git /usr/local/lib/transcrypt
ln -s /usr/local/lib/transcrypt/transcrypt /usr/local/bin/transcrypt
chmod +x /usr/local/bin/transcrypt

echo "*** Checking Transcrypt version ***"
transcrypt --version