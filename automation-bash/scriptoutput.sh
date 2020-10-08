#!/bin/bash

#test ./scriptoutput.sh > stdout.txt 2> stderr.txt
echo "This part of the script worked"
echo "Error: this part failed" >&2



