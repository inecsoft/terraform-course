
#--------------------------------------------------------------------------
resource  "aws_route_table" "my_vpc_route_table_public" {
  vpc_id = "${aws_vpc.my_vpc.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.my_vpc_gw.id}"
    
  }
  tags = {
    Name = "MY VPC Route table public"
  }
}
#--------------------------------------------------------------------------
#create the route table association for the igw on the vpc and the public subnets
#------------------------------------------------------------------------------- 
resource "aws_route_table_association" "rt-association" {
  count = "${length(var.subnet_cidr_public)}"
  subnet_id = "${element(aws_subnet.my_vpc_subnet_public.*.id, count.index)}"
  route_table_id = "${aws_route_table.my_vpc_route_table_public.id}"
  

}
#------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------
# VPC setup for NAT
#-------------------------------------------------------------------------------------------
resource "aws_route_table" "my_vpc_route_table_private" {
    vpc_id = "${aws_vpc.my_vpc.id}"
    route {
        cidr_block = "0.0.0.0/0"
        nat_gateway_id = "${aws_nat_gateway.nat_gw.id}"
    }

    tags = {
        Name = "my_vpc_route_table_nat_private"
    }
}
#-------------------------------------------------------------------------------------------
#create the route table association for the nat gw on the vpc and the private subnets
#-------------------------------------------------------------------------------------------
resource "aws_route_table_association" "rt_association_private" {
    count = "${length(var.subnet_cidr_private)}"
    subnet_id = "${element(aws_subnet.my_vpc_subnet_private.*.id, count.index)}"
    route_table_id = "${aws_route_table.my_vpc_route_table_private.id}"

}

#-------------------------------------------------------------------------------------------

