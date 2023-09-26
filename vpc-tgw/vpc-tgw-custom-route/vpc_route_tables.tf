#create routes tables
#--------------------------------------------------------------------
resource  "aws_route_table" "vpc1_route_table" {
  depends_on = [module.vpc1, aws_ec2_transit_gateway.tgw ]
  vpc_id = module.vpc1.vpc_id
  route {
    cidr_block = "10.0.0.0/8"
    #gateway_id = module.tgw.ec2_transit_gateway_id
    gateway_id =  aws_ec2_transit_gateway.tgw.id
  }
  tags = {
    Name = "${local.default_name}-vpc1-Route-table"
  }
}
#-------------------------------------------------------------------------------
resource  "aws_route_table" "vpc2_route_table" {
  depends_on = [module.vpc2 , aws_ec2_transit_gateway.tgw]
  vpc_id = module.vpc2.vpc_id
  route {
    cidr_block = "10.0.0.0/8"
    #gateway_id = module.tgw.ec2_transit_gateway_id
    gateway_id =  aws_ec2_transit_gateway.tgw.id

  }
  tags = {
    Name = "${local.default_name}-vpc2-Route-table"
  }
}
#------------------------------------------------------------------------------