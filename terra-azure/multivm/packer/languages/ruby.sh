#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Ruby ***"
apt-get -qq -y -o=Dpkg::Use-Pty=0 install ruby-full
gem install bundler
gem install rake

echo "*** Checking Ruby installation ***"
ruby -v
rake --version
bundle version