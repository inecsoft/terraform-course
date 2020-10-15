#!/bin/bash
function f2 {
   echo in f2
   exit 2
   echo more in f2
}
echo starting
f2
echo after f2

