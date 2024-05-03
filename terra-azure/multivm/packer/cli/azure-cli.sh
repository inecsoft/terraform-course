#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Azure CLI ***"
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash