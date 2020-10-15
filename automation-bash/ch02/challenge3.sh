#!/bin/bash
n=1
ps -ly | while
read c1 c2 c3 c4 c5 c6 c7 c8 c9 c10
do
    if ((n>1))
    then
        ((rss=rss+c8))
        (( sz=sz+c9 ))
        echo rss=$rss sz=$sz
    fi
((n++))
done 
