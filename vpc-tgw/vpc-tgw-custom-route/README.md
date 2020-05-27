***

# __Transit Gateway__

***

### __Default route table__

#### * _after creting the transit gateway attachments_
#### * _Check transit gateway Route tables_
        
    1- Associations 
    2- Propagations 
    3- Routes. That are created automatically when propagations are created.
_Note:_ Go to route tables of the vpcs  and create route like:
10.0.0.0/8 pointing to the transit gateway.
this will allow the traffic between the vpcs through the TGW.

### __Custom route table__

    1- Create the transit gateway route table
    2- Create the association with the vpc.
    3- Create the propagation from the vpc you need to send traffic to the vpc destination.


***

_Testing:_

 echo "var.vpc"| terraform console

***