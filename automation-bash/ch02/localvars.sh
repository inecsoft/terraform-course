#!/bin/bash
function f {
declare A=1
echo A is $A
}
A=2
f
echo A is now $A
