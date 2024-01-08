#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/app
NODE_ENV=production npm start > /dev/null 2> /dev/null < /dev/null &
sleep 2
echo $! > node.pid