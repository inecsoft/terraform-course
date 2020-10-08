#!/bin/bash

#test ./whileread.sh /etc/passwd
while IFS= read -r LINE; do
     echo "$LINE" | sed 's/:/ /g'
done < "$1"