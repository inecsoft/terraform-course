#!/bin/bash
echo -n "Print message? "
valid=0
while
[ $valid == 0 ]
do
    read ans
    case $ans in
    yes|YES|y|Y ) echo Will print the message
                  echo The Message
                  valid=1
                  ;;
    [nN][oO]    ) echo Will NOT print the message 
                  valid=1 ;;
    *           ) echo Yes or No of some form please ;;
    esac
done
