#create an eip address to asign it to the nat gateway 
#----------------------------------------------------------------
resource "aws_eip" "main_nat" {
  vpc = true
  tags = {
    Name = "nat ip gateway"
  }
}

#------------------------------------
#create  nat gw to provide internet access to the private subnets
#--------------------------------
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.main_nat.id
  subnet_id     = aws_subnet.main-public-1.id
  depends_on    = ["aws_internet_gateway.main-gw"]

  tags = {
    Name = "main_nat_gateway"
  }
}
#---------------------------------------------------------------

