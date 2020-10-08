#!/bin/bash

OLDIFS="$IFS"
IFS=$'\n'

for file in $(find /etc) ; do
  echo "$file"
done
IFS="$OLDIFS"