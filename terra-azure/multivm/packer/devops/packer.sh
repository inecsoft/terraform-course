#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Packer ***"
wget --quiet https://releases.hashicorp.com/packer/1.7.0/packer_1.7.0_linux_amd64.zip
unzip -q packer_*.zip -d /usr/bin
rm -rf packer_*.zip

echo "*** Checking Packer installation ***"
packer version