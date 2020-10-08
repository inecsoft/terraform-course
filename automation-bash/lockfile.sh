#!/bin/bash

#test run in a terminal bash -x ./lockfile.sh open a second terminal and run  bash -x ./lockfile.sh
#you will notice that the second script is not in the loop till the first is terminated

exec 200>/tmp/${0}-lock || exit 1
flock 200 || exit

while true; do 
   sleep 1
done

flock -u 200
