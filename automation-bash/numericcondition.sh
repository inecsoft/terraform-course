#!/bin/bash

#test 1: ./numericcondition.sh 1 5
#test 2: ./numericcondition.sh 5 1

if (($1 > $2)); then 
   echo "The first argument is larger than the second"
else 
   echo "The second argument is larger than the first"
fi

#test : ./numericcondition.sh 8 9
sum=$(($1+$2))
if [[ "$sum" -ge 10 ]]; then 
    echo "The sum of the fist two arguments is greater than or equal to 10"
else 
    echo "The sum of the first two arguments is less than 10"
fi