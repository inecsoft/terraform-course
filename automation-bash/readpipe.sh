#/bin/bash

#test if a pipe cat /etc/passwd | ./readpipe.sh

if [[ -p /dev/stdin ]]; then
  while IFS= read -r LINE; do 
       #echo "Line: $LINE"
       pipearray+=( "$LINE" )
    done
fi

echo ${pipearray[@]}