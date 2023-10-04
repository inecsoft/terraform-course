#create internet gateway for the vpc
#----------------------------------------------------------------
resource "aws_internet_gateway" "vpc_gw_client" {
  provider = aws.client
  vpc_id   = aws_vpc.vpc_client.id
  tags = {
    Name = "VPC IGW client"
  }
}
#---------------------------------------------------------------
resource "aws_internet_gateway" "vpc_gw_main" {
  provider = aws.main
  vpc_id   = aws_vpc.vpc_main.id
  tags = {
    Name = "VPC IGW main"
  }
}
#---------------------------------------------------------------