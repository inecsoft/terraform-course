#!/bin/bash

echo "How to calculate the Total compute changes of you lambda service:"

read -p "Enter amount of lambda excecution: `echo -e "\n"`" excec_amount
read -p "Enter amount of lambda time excecution in ms: `echo -e "\n"`" excec_time
read -p "Enter amount of Memory Ram allowcated in MB: `echo -e "\n"`" ram


free_tier_GBs=400000
free_tier_request=1000000

Total_compute_s=`echo "$excec_amount*$excec_time * 0.001" | bc`
Total_compute_GBs=`echo "$Total_compute_s*$ram/1024" | bc`

monthly_compute_charges_freetier=`echo "($Total_compute_GBs - $free_tier_GBs) * 0.0000166667" | bc`
monthly_compute_charges=`echo "$Total_compute_GBs * 0.0000166667" | bc`

mothly_bill_request_freetier=`echo "($excec_amount - $free_tier_request) * 0.0000002" | bc`
mothly_bill_request=`echo "$excec_amount * 0.0000002" | bc`

Lambda_costs_Free_Tier=`echo "$monthly_compute_charges_freetier + $mothly_bill_request_freetier" | bc`
Lambda_costs=`echo "$monthly_compute_charges + $mothly_bill_request" | bc`

echo "The cost of lambda with Free tier: $ $Lambda_costs_Free_Tier "
echo "The full cost of lambda: $ $Lambda_costs "
