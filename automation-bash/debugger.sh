#!/bin/bash
set -x
for i in {1..10}; do
    echo $i
done

set +x
for i in {a..z}; do
    echo $i
done

./debugger.sh 2>result.txt
