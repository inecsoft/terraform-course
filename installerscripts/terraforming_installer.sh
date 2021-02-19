#!/bin/bash

if [ ! $(which gem) ];then
   sudo apt install -y ruby
   echo "ruby was installed"
 else
   echo "ruby is installed"
fi

if [ ! $(which terraforming) ];then
   sudo gem install terraforming
   echo "terraforming was installed"
 else
   echo "`terraforming` is installed"