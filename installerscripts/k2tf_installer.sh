#!/bin/bash

cd /tmp
git clone https://github.com/sl1pm4t/k2tf.git

cd k2tf
sudo make build
sudo cp ./k2tf /usr/local/bin
k2tf -h
cd ..

rm -rf /tmp/k2tf
