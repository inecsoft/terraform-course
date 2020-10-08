#!/bin/bash

#mapfile commad to read file in an array
# test ./mapfile.sh /etc/passwd

declare -a passarray
mapfile passarray < "$1"

echo ${passarray[@]}