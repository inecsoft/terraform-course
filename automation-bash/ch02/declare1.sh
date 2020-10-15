#!/bin/bash
declare -n myvar=$1
echo myvar is $myvar
myvar=New
echo 1 is $1
shift
echo myvar is $myvar
echo 1 is $1

