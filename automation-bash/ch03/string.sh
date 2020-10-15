#!/bin/bash
s="a string with words"
sub=${s:4}
echo sub is $sub
sub=${s:4:3}
echo sub is $sub
echo length of s is ${#s}


