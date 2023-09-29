#-----------------------------------------------------
#creates 3 public subnets one per availability zone
#----------------------------------------------------
resource "aws_subnet" "vpc_subnet_public_client" {
  provider = aws.client
  count                   = length(var.subnet_cidr_public_client)
  vpc_id                  = aws_vpc.vpc_client.id
  cidr_block              = element(var.subnet_cidr_public_client, count.index)
  map_public_ip_on_launch = "true"
  availability_zone       = element(data.aws_availability_zones.azs_client.names, count.index)

  tags = {
    Name = "vpc_subnet_public_client-${count.index + 1}"
  }
}
#----------------------------------------------------
#creates 3 private subnets one per availability zone
#---------------------------------------------------
resource "aws_subnet" "vpc_subnet_private_client" {
  provider = aws.client
  count                   = length(var.subnet_cidr_private_client)
  vpc_id                  = aws_vpc.vpc_client.id
  cidr_block              = element(var.subnet_cidr_private_client, count.index)
  map_public_ip_on_launch = "false"
  availability_zone       = element(data.aws_availability_zones.azs_client.names, count.index)

  tags = {
    Name = "vpc_subnet_private_client-${count.index + 1}"
  }
}
#---------------------------------------------------------

#-----------------------------------------------------
#creates 3 public subnets one per availability zone
#----------------------------------------------------
resource "aws_subnet" "vpc_subnet_public_main" {
  provider = aws.main
  count                   = length(var.subnet_cidr_public_main)
  vpc_id                  = aws_vpc.vpc_main.id
  cidr_block              = element(var.subnet_cidr_public_main, count.index)
  map_public_ip_on_launch = "true"
  availability_zone       = element(data.aws_availability_zones.azs_main.names, count.index)

  tags = {
    Name = "vpc_subnet_public_main-${count.index + 1}"
  }
}
#----------------------------------------------------
#creates 3 private subnets one per availability zone
#---------------------------------------------------
resource "aws_subnet" "vpc_subnet_private_main" {
  provider = aws.main
  count                   = length(var.subnet_cidr_private_main)
  vpc_id                  = aws_vpc.vpc_main.id
  cidr_block              = element(var.subnet_cidr_private_main, count.index)
  map_public_ip_on_launch = "false"
  availability_zone       = element(data.aws_availability_zones.azs_main.names, count.index)

  tags = {
    Name = "vpc_subnet_private_main-${count.index + 1}"
  }
}
#---------------------------------------------------------
