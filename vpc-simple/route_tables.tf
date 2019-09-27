#create routes tables
#--------------------------------------------------------------------
resource  "aws_route_table" "my_vpc_route_table" {
  vpc_id = "${aws_vpc.my_vpc.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.my_vpc_gw.id}"
    
  }
  tags = {
    Name = "MY VPC Route table"
  }
}
#--------------------------------------------------------------------------
#create the route table association for the igw on the vpc and the public subnets
#------------------------------------------------------------------------------- 
resource "aws_route_table_association" "rt-association" {
  count = "${length(var.subnet_cidr_public)}"
  subnet_id = "${element(aws_subnet.my_vpc_subnet_public.*.id, count.index)}"
  route_table_id = "${aws_route_table.my_vpc_route_table.id}"
}
#------------------------------------------------------------------------------


