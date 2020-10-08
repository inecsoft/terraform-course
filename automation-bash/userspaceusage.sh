#!/bin/bash

LIMIT="100000"
MDIR='/home'
MAilTO='root@localnet.com'
SUBJECT="$MDIR disk usage"

if ! which mailx &>/dev/null ; then
    echo "Please install mailx"
    exit 1
fi

cd "$MDIR"
for user in * ; do
   SIZE=$(du -s $MDIR | awk '{print $1}')
   if [[ $SIZE -ge $LIMIT ]]; then
      echo du -sh $user | mailx -s $SUBJECT $MAilTO
   fi
done
