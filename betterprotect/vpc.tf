# Internet VPC
resource "aws_vpc" "betterproject_vpc" {
  cidr_block           = "10.0.0.0/16"
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"
  enable_classiclink   = "false"

  tags = {
    Name = "betterproject_vpc"
  }
}

# Subnets
resource "aws_subnet" "betterproject_vpc-public-1" {
  vpc_id                  = aws_vpc.betterproject_vpc.id
  cidr_block              = "10.0.1.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-west-1a"

  tags = {
    Name = "betterproject_vpc-public-1"
  }
}

resource "aws_subnet" "betterproject_vpc-public-2" {
  vpc_id                  = aws_vpc.betterproject_vpc.id
  cidr_block              = "10.0.2.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-west-1b"

  tags = {
    Name = "betterproject_vpc-public-2"
  }
}

resource "aws_subnet" "betterproject_vpc-public-3" {
  vpc_id                  = aws_vpc.betterproject_vpc.id
  cidr_block              = "10.0.3.0/24"
  map_public_ip_on_launch = "true"
  availability_zone       = "eu-west-1c"

  tags = {
    Name = "betterproject_vpc-public-3"
  }
}

resource "aws_subnet" "betterproject_vpc-private-1" {
  vpc_id                  = aws_vpc.betterproject_vpc.id
  cidr_block              = "10.0.4.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "eu-west-1a"

  tags = {
    Name = "betterproject_vpc-private-1"
  }
}

resource "aws_subnet" "betterproject_vpc-private-2" {
  vpc_id                  = aws_vpc.betterproject_vpc.id
  cidr_block              = "10.0.5.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "eu-west-1b"

  tags = {
    Name = "betterproject_vpc-private-2"
  }
}

resource "aws_subnet" "betterproject_vpc-private-3" {
  vpc_id                  = aws_vpc.betterproject_vpc.id
  cidr_block              = "10.0.6.0/24"
  map_public_ip_on_launch = "false"
  availability_zone       = "eu-west-1c"

  tags = {
    Name = "betterproject_vpc-private-3"
  }
}

# Internet GW
resource "aws_internet_gateway" "betterproject_vpc-gw" {
  vpc_id = aws_vpc.betterproject_vpc.id

  tags = {
    Name = "betterproject_vpc-igw"
  }
}

# route tables 
resource "aws_route_table" "betterproject_vpc_route_table_public" {
  vpc_id = aws_vpc.betterproject_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.betterproject_vpc-gw.id
  }

  tags = {
    Name = "betterproject_vpc-route-table"
  }
}




# route associations public
resource "aws_route_table_association" "betterproject_vpc-public-1-a" {
  subnet_id      = aws_subnet.betterproject_vpc-public-1.id
  route_table_id = aws_route_table.betterproject_vpc_route_table_public.id
}

resource "aws_route_table_association" "betterproject_vpc-public-2-a" {
  subnet_id      = aws_subnet.betterproject_vpc-public-2.id
  route_table_id = aws_route_table.betterproject_vpc_route_table_public.id
}

resource "aws_route_table_association" "betterproject_vpc-public-3-a" {
  subnet_id      = aws_subnet.betterproject_vpc-public-3.id
  route_table_id = aws_route_table.betterproject_vpc_route_table_public.id
}



