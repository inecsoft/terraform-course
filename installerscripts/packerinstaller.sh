#!/bin/bash

version=1.4.5
PACKER_ZIP_FILE=packer_${version}_linux_amd64.zip
PACKER=https://releases.hashicorp.com/packer/${version}
PACKER_BIN=packer

if [ ! -f $(which wget)  ];then
        echo "wget is installed"
    else
       sudo apt install -y wget
       echo "wget commad is was installed"
fi

if [ ! -f $(which unzip)  ];then
        echo "unzip is installed"
    else
       sudo apt install -y wget
       echo "unzip commad is was installed"
fi

function install_packer {
    if [ -z $(which $PACKER_BIN) ]
       then
           wget ${PACKER}/${PACKER_ZIP_FILE}
           unzip ${PACKER_ZIP_FILE}
           sudo mv ${PACKER_BIN} /usr/local/bin/${PACKER_BIN}
           rm -rf ${PACKER_ZIP_FILE}
    else
       echo "packer is most likely installed"
    fi
 
}
 
install_packer 