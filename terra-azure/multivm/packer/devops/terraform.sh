#!/bin/bash -e -x

DEBIAN_FRONTEND=noninteractive
export DEBIAN_FRONTEND

echo "*** Installing Terraform ***"
wget --quiet https://releases.hashicorp.com/terraform/0.14.2/terraform_0.14.2_linux_amd64.zip
unzip -q terraform_*.zip -d /usr/bin
rm -rf terraform_*.zip

echo "*** Checking Terraform installation ***"
terraform version