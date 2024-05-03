#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing AWS CLI ***"
sudo -H python3 -m pip install --upgrade awscli
sudo -H python3 -m pip install --upgrade boto

echo "*** Checking AWS CLI installation ***"
aws --version