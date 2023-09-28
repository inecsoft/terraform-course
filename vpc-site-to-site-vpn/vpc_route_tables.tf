#create vpc routes tables
#--------------------------------------------------------------------
resource "aws_route_table" "vpc1_route_table" {
  depends_on = [module.vpc1]
  provider = aws.client
  vpc_id     = module.vpc1.vpc_id
  route {
    cidr_block = "10.2.0.0/16"
    network_interface_id = aws_eip.eip.network_interface
  }

  tags = {
    Name = "client-vpn-vpc1-Route-table"
  }
}
#-------------------------------------------------------------------------------
resource "aws_route_table" "vpc2_route_table" {
  depends_on = [module.vpc2]
  provider = aws.main
  vpc_id     = module.vpc2.vpc_id

  propagating_vgws = [
    aws_vpn_gateway.vpn_gateway.id
  ]

  /* route {
    cidr_block = "10.0.0.0/8"
    #gateway_id = module.tgw.ec2_transit_gateway_id
    transit_gateway_id         = null
    gateway_id = aws_vpn_gateway.vpn_gateway.id

  } */

  tags = {
    Name = "propagation-vpc2-Route-table"
    CI   = "terraform"
    env  = "main"
  }
}
#------------------------------------------------------------------------------
