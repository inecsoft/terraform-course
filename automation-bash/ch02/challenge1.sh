#!/bin/bash
function f {
    typeset A
    A=1
}
A=2
f
echo after f, A = $A
