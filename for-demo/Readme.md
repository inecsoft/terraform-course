# __for loop__  
***

``` bash  
terraform console
``` 

* #### __How to test:__  
  * _Create list with static values_  
  
  [ for s in [a,b,c]: s ]  
  [ for s in [a,b,c]: upper(s) ]  


  * _Create list with dynamic values from list_  
  [ for s in var.list1: s + 1 ]  
  [ for s in var.list2: upper(s) ]  

  * _Create list with dynamic values from maps_  
  [ for v,k in var.map1: v ]  
  [ for v,k in var.map1: upper(k) ] 
  [ for v,k in var.map1: v => k ]  
   
  * _Create map with dynamic values from maps_  
  { for v,k in var.map1: v => k } 

_*Note:*_ v => k swaps the key for values. 
  