#!/bin/bash

var=(`ls ../old`)

for i in ${!var[@]}; do
  echo $i  `du -h  ../old/${var[$i]}`
  
  read -p "enter num: " num 
  if [ "$num" ]; then
    cp -r ../old/${var[$num]} .
    git add ${var[$num]} 
    git commit -m "${var[$num]}" 
    git push
    echo "${var[$num]} was puhed to the repo"
    rm -r ../old/${var[$num]}
  else
    echo "${var[$num]} will not be push to the repo"
  fi 
 
done
