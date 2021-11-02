#----------------------------------------------------------------------------------------
resource "aws_ec2_transit_gateway" "tgw" {
  description     = "transit gateway custom route manual"
  amazon_side_asn = "65534"


  dns_support                     = "enable"
  vpn_ecmp_support                = "enable"
  default_route_table_association = "enable"
  auto_accept_shared_attachments  = "enable"

  #  auto_accept_shared_attachments =  

  tags = {
    Name = "TGW-custom-route-manual"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_ec2_transit_gateway_vpc_attachment" "tgw-vpc-att1" {
  subnet_ids         = module.vpc1.public_subnets
  transit_gateway_id = aws_ec2_transit_gateway.tgw.id
  vpc_id             = module.vpc1.vpc_id

  dns_support  = "enable"
  ipv6_support = "disable"

  transit_gateway_default_route_table_association = false
  transit_gateway_default_route_table_propagation = false

  tags = {
    Name = "tgw-vpc-att1"
  }
}
resource "aws_ec2_transit_gateway_vpc_attachment" "tgw-vpc-att2" {
  subnet_ids         = module.vpc2.public_subnets
  transit_gateway_id = aws_ec2_transit_gateway.tgw.id
  vpc_id             = module.vpc2.vpc_id

  dns_support  = "enable"
  ipv6_support = "disable"

  transit_gateway_default_route_table_association = false
  transit_gateway_default_route_table_propagation = false

  tags = {
    Name = "tgw-vpc-att2"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_ec2_transit_gateway_route_table" "tgw-rt" {
  transit_gateway_id = aws_ec2_transit_gateway.tgw.id

  #  default_association_route_table  = false
  #  default_propagation_route_table  = false

  tags = {
    Name = "TGW-RT-manual"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_ec2_transit_gateway_route_table_association" "tgw-rt-ass1" {
  transit_gateway_attachment_id  = aws_ec2_transit_gateway_vpc_attachment.tgw-vpc-att1.id
  transit_gateway_route_table_id = aws_ec2_transit_gateway_route_table.tgw-rt.id
}
resource "aws_ec2_transit_gateway_route_table_association" "tgw-rt-ass2" {
  transit_gateway_attachment_id  = aws_ec2_transit_gateway_vpc_attachment.tgw-vpc-att2.id
  transit_gateway_route_table_id = aws_ec2_transit_gateway_route_table.tgw-rt.id
}
#----------------------------------------------------------------------------------------
resource "aws_ec2_transit_gateway_route_table_propagation" "tgw-rt-p1" {
  transit_gateway_attachment_id  = aws_ec2_transit_gateway_vpc_attachment.tgw-vpc-att2.id
  transit_gateway_route_table_id = aws_ec2_transit_gateway_route_table.tgw-rt.id
}
resource "aws_ec2_transit_gateway_route_table_propagation" "tgw-rt-p2" {
  transit_gateway_attachment_id  = aws_ec2_transit_gateway_vpc_attachment.tgw-vpc-att1.id
  transit_gateway_route_table_id = aws_ec2_transit_gateway_route_table.tgw-rt.id
}
#----------------------------------------------------------------------------------------

