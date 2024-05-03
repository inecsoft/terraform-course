#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Python 3/pip ***"
sudo apt install python3 python3-pip -y