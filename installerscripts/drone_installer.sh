#!/bin/bash

if [ ! $(which drone) ];then
   curl -Lk https://github.com/drone/drone-cli/releases/download/v0.8.6/drone_linux_amd64.tar.gz | tar zx
   sudo install -t /usr/local/bin drone
   echo "`drone -v` was installed"
   rm -rf drone
 else
   echo "`drone -v` is installed"
fi