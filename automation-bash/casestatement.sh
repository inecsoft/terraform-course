#!/bin/bash

#AGE=$1
read -rp "Enter your age for evaluation: "  AGE
#echo -e "/n"

case $AGE in 
        [1-9]) echo "You are quite young."               ;;&
        [5-9]) echo "Time for elementary school."        ;;
       1[0-9]) echo "Time for middle school."            ;&
   [2-9][0-9]) echo "You are an adult."                  ;;
            *) echo "That doesn't seem to be and age."   ;;

esac 

#action list terminator - ;;
#action list terminator - ;;&
#action list terminator - ;&
#wild card *)