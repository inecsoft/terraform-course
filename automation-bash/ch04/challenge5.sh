#!/bin/bash
echo sleeping 5, no trap
sleep 5
trap "" INT
echo sleeping 5, ignore INT
sleep 5
trap "echo You interrupted me now" INT
echo sleeping 5 with INT message
sleep 5

