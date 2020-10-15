#!/bin/bash
cd /usr/bin
for i in *
do
if [[ -f $i ]]
then
     if
     strings $i | grep -q "unable to fork"
     then
         echo $i has \"unable to fork\" in it
     fi
fi
done

