#!/bin/bash
# Initialise on Ubuntu Linux
# Instructions copied from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?pivots=apt

# Set the Azure CLI apt source
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Update apt and install dependancies
sudo apt-get update
sudo apt-get install ca-certificates curl apt-transport-https lsb-release gnupg

# Download MS signing key
curl -sL https://packages.microsoft.com/keys/microsoft.asc |
    gpg --dearmor |
    sudo tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null

# Add Azure CLI software repo
AZ_REPO=$(lsb_release -cs)
echo "deb [arch=amd64] https://packages.microsoft.com/repos/azure-cli/ $AZ_REPO main" |
    sudo tee /etc/apt/sources.list.d/azure-cli.list

# Update apt and install Azure CLI
sudo apt-get update
sudo apt-get install azure-cli