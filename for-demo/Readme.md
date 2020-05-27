***  
<div align="center">
 <h1>For loop</h1>  
</div>  

***  

``` bash  
terraform console
``` 

* #### __Create list with static values__
  
  [ for s in [a,b,c]: s ]  
  [ for s in [a,b,c]: upper(s) ]  

* #### __Create list with dynamic values from list:__  
  [ for s in var.list1: s + 1 ]  
  [ for s in var.list2: upper(s) ]  

* #### __Create list with dynamic values from maps:__  
  [ for v,k in var.map1: v ]  
  [ for v,k in var.map1: upper(k) ] 
  [ for v,k in var.map1: v => k ]  
   
* ####  __Create map with dynamic values from maps:__  
  { for v,k in var.map1: v => k } 

_*Note:*_  
v => k swaps the key for values. 

***  