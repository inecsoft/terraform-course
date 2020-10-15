#!/bin/bash

unset x
a=${x:-Hotdog}
echo a is $a
echo x is $x

a=${x:=Hotdog}
echo a is $a
echo x is $x

unset x
${x:?}
echo Will not get here


