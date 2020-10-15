#!/bin/bash
declare -l lstring="ABCdef"
declare -u ustring="ABCdef"
declare -r readonly="A Value"
declare -a Myarray
declare -A Myarray2

echo lstring = $lstring
echo ustring = $ustring
echo readonly = $readonly
readonly="New Value"
Myarray[2]="Second Value"
echo 'Myarray[2]= ' ${Myarray[2]}
Myarray2["hotdog"]="baseball"
echo 'Myarray2[hotdog]= ' ${Myarray2["hotdog"]}

