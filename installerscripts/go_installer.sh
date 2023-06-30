#!/bin/bash

if [ ! -f $(which helm) ]; then
   GO_VERSION=1.20.5
   wget https://go.dev/dl/go$GO_VERSION.linux-amd64.tar.gz
   tar -zxvf go$GO_VERSION.linux-amd64.tar.gz
   sudo mv go /usr/local/bin/go
   echo "go was installed"
   export PATH=$PATH:/usr/local/bin/go
fi