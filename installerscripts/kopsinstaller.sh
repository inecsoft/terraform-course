#!/bin/bash

function install_kops {
    if [ -z $(which kops) ]
       then
           curl -LO https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
           chmod +x kops-linux-amd64
           sudo mv kops-linux-amd64 /usr/local/bin/kops
       else
           echo "kops is most likely installed"
       fi
}
 

install_kops