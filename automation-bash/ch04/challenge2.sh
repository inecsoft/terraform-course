#!/bin/bash
echo options are $@
opts="a b \$1 \$2  "
#set -- "$opts"
eval set -- $opts 
echo options are: $@



