#create an eip address to asign it to the nat gateway 
#----------------------------------------------------------------
resource "aws_eip" "nat" {
  vpc  = true
  tags = {
    Name = "nat ip gateway" 
  }
}

#------------------------------------
#create  nat gw to provide internet access to the private subnets
#--------------------------------
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = "${aws_eip.nat.id}"
  subnet_id = "${aws_subnet.my_vpc_subnet_public[0].id}"
  depends_on = ["aws_internet_gateway.my_vpc_gw"]
 
  tags = {
   Name = "my_vpc_nat_gateway"
  }
}
#---------------------------------------------------------------

