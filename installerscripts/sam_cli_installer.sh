#!/bin/bash

if [ ! -f $(which wget)  ];then
        echo "wget is installed"
    else
       sudo apt install -y wget
       echo "wget commad is was installed"
fi

if [ ! -f $(which unzip)  ];then
        echo "unzip is installed"
    else
       sudo apt install -y unzip
       echo "unzip command was installed"
fi

wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
unzip aws-sam-cli-linux-x86_64.zip -d sam-installation

sudo ./sam-installation/install
sam --version
rm -rf aws-sam-cli-linux-x86_64.zip sam-installation