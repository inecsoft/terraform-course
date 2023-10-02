#create vpc routes tables
#--------------------------------------------------------------------
resource "aws_route_table" "vpc1_route_table" {
  depends_on = [module.vpc1]
  provider   = aws.client
  vpc_id     = module.vpc1.vpc_id

  route {
    cidr_block = "10.2.0.0/16"
    vpc_peering_connection_id = aws_vpc_peering_connection.client.id
  }

  tags = {
    Name = "client-vpc1-peering-Route-table"
  }
}
#-------------------------------------------------------------------------------
resource "aws_route_table" "vpc2_route_table" {
  depends_on = [module.vpc2]
  provider   = aws.main
  vpc_id     = module.vpc2.vpc_id

  route {
    cidr_block = "10.1.0.0/16"
    vpc_peering_connection_id = aws_vpc_peering_connection.client.id
  }

  /* propagating_vgws = [
    vpc_peering_connection_id = aws_vpc_peering_connection.client.id
  ] */

  tags = {
    Name = "propagation-vpc2-Route-table"
    CI   = "terraform"
    env  = "main"
  }
}
#------------------------------------------------------------------------------
