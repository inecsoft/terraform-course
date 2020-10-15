#!/bin/bash
function myfunc {
   echo starting myfunc
   return
   echo this will not be executed
}

myfunc
n=$(myfunc)
echo n is $n

