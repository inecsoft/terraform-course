#!/bin/bash
x=1
while
	((x<10))
do
	echo loop $x
	date >date.$x
	((x=x+1))
done

