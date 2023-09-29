resource "aws_route_table" "vpc_route_table_public_client" {
  provider = aws.client
  vpc_id = aws_vpc.vpc_client.id

  route {
    cidr_block = "10.2.0.0/16"
    network_interface_id = aws_eip.eip.network_interface
  }

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.vpc_gw_client.id

  }
  tags = {
    Name = "vpc_route_table_public_client"
  }
}
#--------------------------------------------------------------------------
#create the route table association for the igw on the vpc and the public subnets
#-------------------------------------------------------------------------------
resource "aws_route_table_association" "rt-association_client" {
  provider = aws.client
  count          = length(var.subnet_cidr_public_client)
  subnet_id      = element(aws_subnet.vpc_subnet_public_client.*.id, count.index)
  route_table_id = aws_route_table.vpc_route_table_public_client.id
}
#------------------------------------------------------------------------------

#---------------------------------------------------------------
# VPC setup for NAT
#---------------------------------------------------------------------------
resource "aws_route_table" "vpc_route_table_private_client" {
  provider = aws.client
  vpc_id = aws_vpc.vpc_client.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw_client.id
  }

  tags = {
    Name = "vpc_route_table_nat_private_client"
  }
}
#---------------------------------------------------------------
#create the route table association for the nat gw on the vpc and the private subnets
#--------------------------------------------------------------------
resource "aws_route_table_association" "rt_association_private_client" {
  provider = aws.client
  count          = length(var.subnet_cidr_private_client)
  subnet_id      = element(aws_subnet.vpc_subnet_private_client.*.id, count.index)
  route_table_id = aws_route_table.vpc_route_table_private_client.id
}

#-------------------------------------------------------------

##################################################################
resource "aws_route_table" "vpc_route_table_public_main" {
  provider = aws.main
  vpc_id = aws_vpc.vpc_main.id

  propagating_vgws = [
    aws_vpn_gateway.vpn_gateway.id
  ]

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.vpc_gw_main.id
  }

  tags = {
    Name = "vpc_route_table_public_main"
  }
}
#--------------------------------------------------------------------------
#create the route table association for the igw on the vpc and the public subnets
#-------------------------------------------------------------------------------
resource "aws_route_table_association" "rt-association_main" {
  provider = aws.main
  count          = length(var.subnet_cidr_public_main)
  subnet_id      = element(aws_subnet.vpc_subnet_public_main.*.id, count.index)
  route_table_id = aws_route_table.vpc_route_table_public_main.id
}
#------------------------------------------------------------------------------

#---------------------------------------------------------------
# VPC setup for NAT
#---------------------------------------------------------------------------
resource "aws_route_table" "vpc_route_table_private_main" {
  provider = aws.main
  vpc_id = aws_vpc.vpc_main.id

  propagating_vgws = [
    aws_vpn_gateway.vpn_gateway.id
  ]

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw_main.id
  }

  route {
    cidr_block = "10.1.0.0/16"
    #gateway_id = module.tgw.ec2_transit_gateway_id
    #transit_gateway_id         = null
    gateway_id = aws_vpn_gateway.vpn_gateway.id

  }

  tags = {
    Name = "vpc_route_table_nat_private_main"
  }
}
#---------------------------------------------------------------
#create the route table association for the nat gw on the vpc and the private subnets
#--------------------------------------------------------------------
resource "aws_route_table_association" "rt_association_private_main" {
  provider = aws.main
  count          = length(var.subnet_cidr_private_main)
  subnet_id      = element(aws_subnet.vpc_subnet_private_main.*.id, count.index)
  route_table_id = aws_route_table.vpc_route_table_private_main.id
}
#-------------------------------------------------------------
######################################################################
