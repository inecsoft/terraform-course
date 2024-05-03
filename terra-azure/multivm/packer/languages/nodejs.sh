#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing NodeJS ***"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt-get -y -qq install -o=Dpkg::Use-Pty=0 nodejs

echo "*** Installing Yarn ***"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get -y -qq update -o=Dpkg::Use-Pty=0
apt-get -y -qq install -o=Dpkg::Use-Pty=0 yarn

echo "*** Checking NodeJS installation ***"
node --version
npm --version
yarn --version