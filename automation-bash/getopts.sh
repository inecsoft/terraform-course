#!/bin/bash

#The :a options turn off verbose errors and "a" is the only valid option to the script.
#test 1 ./getopts.sh -x ivan pedro cat
#test 2 ./getopts.sh -a ivan pedro cat
#test 3 ./getopts.sh -b ivan pedro cat

while getopts ":a: :b:" opt; do 
   case $opt in 
        a) echo "You passed the -a option with the $OPTARG argument"  >&2 ;;
        b) echo "You passed the -b option with the $OPTARG argument"  >&2 ;;
        :) echo "Option -$opt requires and argument" >&2 ; exit 1 ;;
        \?) echo "Invalid option: -$opt" >&2 ;;
    esac
done
shift $((OPTIND-1))

echo '$1 is'  "$1"