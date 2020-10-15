#!/bin/bash
function f1 {
typeset x
x=7
y=8
}
x=1
y=2
echo x is $x
echo y is $y
f1
echo x is $x
echo y is $y
((x++))
echo x is $x
echo y is $y
a=15
b=2
if [[ $a -gt $b ]]
then
echo gt
else
echo not gt
fi
if [[ $a > $b ]]
then
echo greater sign 
else
echo not  greater sign
fi
if (( $a > $b )) 
then
echo 2 paren 
else
echo not  2 paren
fi




