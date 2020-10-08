#!/bin/bash

echo '$0 is'  "$0"
echo '$1 is'  "$1"
echo '$2 is'  "$2"
#@ is all ithems, this prints all arguments, to iterate each ithem is quoted,contains word split ithems 
echo '$@ is'  "$@"
#* contains all arg all as one string,
echo '$* is'  "$*"