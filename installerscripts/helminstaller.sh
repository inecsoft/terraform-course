#!/bin/bash

if [ ! -f $(which helm) ]; then
   HELM_VERSION=3.0.0
   wget https://get.helm.sh/helm-v$HELM_VERSION-rc.3-linux-amd64.tar.gz
   tar -zxvf helm-v$HELM_VERSION-*.*-linux-amd64.tar.gz
   sudo mv linux-amd64/helm /usr/local/bin/helm
   echo "helm was installed"
fi