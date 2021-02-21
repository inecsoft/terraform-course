#!/bin/bash

echo "How to calculate the maximun conection allowed of you server"
read -p "Enter memory size in GB: `echo -e "\n"`" ram

result_mysql=`echo "1073741824*$ram/12582880" | bc`
result_postgres=`echo "1073741824*$ram/9531392" | bc`
result_oracle=`echo "1073741824*$ram/9868951" | bc`

echo "$result_mysql mysql max connections allowed from range of 1–100000."
echo "$(( result_postgres > 5000 ? 5000 : result_postgres )) postgres max connections allowed from range of 6–8388607."
echo "$(( result_oracle > 20000 ? 20000 : result_oracle )) oracle max connections allowed from range of 80–20000."