#!/bin/bash

sudo apt-get update  -y && sudo apt-get upgrade -y
sudo apt-get  -y install phppgadmin php-pgsql
sudo apt-get  -y install php php-cgi libapache2-mod-php php-common php-pear php-mbstring

