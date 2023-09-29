#create an eip address to asign it to the nat gateway
#----------------------------------------------------------------
resource "aws_eip" "nat_client" {
  provider = aws.client
  domain   = "vpc"
  tags = {
    Name = "nat ip gateway client"
  }
}

#------------------------------------
#create  nat gw to provide internet access to the private subnets
#--------------------------------
resource "aws_nat_gateway" "nat_gw_client" {
  provider = aws.client
  allocation_id = aws_eip.nat_client.id
  subnet_id     = aws_subnet.vpc_subnet_public_client[0].id
  depends_on    = [ aws_internet_gateway.vpc_gw_client ]

  tags = {
    Name = "vpc_nat_gateway_client"
  }
}
#---------------------------------------------------------------

#create an eip address to asign it to the nat gateway
#----------------------------------------------------------------
resource "aws_eip" "nat_main" {
  provider = aws.main
  domain   = "vpc"
  tags = {
    Name = "nat ip gateway main"
  }
}

#------------------------------------
#create  nat gw to provide internet access to the private subnets
#--------------------------------
resource "aws_nat_gateway" "nat_gw_main" {
  provider = aws.main
  allocation_id = aws_eip.nat_main.id
  subnet_id     = aws_subnet.vpc_subnet_public_main[0].id
  depends_on    = [ aws_internet_gateway.vpc_gw_main ]

  tags = {
    Name = "vpc_nat_gateway_main"
  }
}
#----------------------------------------------------------------