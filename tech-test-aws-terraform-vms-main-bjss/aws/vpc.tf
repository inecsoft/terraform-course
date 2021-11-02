resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = var.candidate
  }
}

resource "aws_internet_gateway" "internet_gateway" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = var.candidate
  }
}

resource "aws_eip" "nat" {
  vpc = true
  tags = {
    Name = var.candidate
  }
}

#------------------------------------
#create  nat gw to provide internet access to the private subnets
#--------------------------------
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public[0].id
  depends_on    = [aws_internet_gateway.internet_gateway]

  tags = {
    Name = var.candidate
  }
}
#---------------------------------------------------------------


resource "aws_subnet" "public" {
  count  = length(var.subnet_cidr_public)
  vpc_id = aws_vpc.vpc.id
  map_public_ip_on_launch = "true"
  cidr_block        = element(var.subnet_cidr_public, count.index)
  availability_zone = element(data.aws_availability_zones.azs.names, count.index)

  tags = {
    Name = var.candidate
    Sub = "${var.candidate}-subnet-public-${count.index + 1}"
  }
}

resource "aws_subnet" "private" {
  count                   = length(var.subnet_cidr_private)
  vpc_id                  = aws_vpc.vpc.id
  cidr_block              = element(var.subnet_cidr_private, count.index)
  map_public_ip_on_launch = "false"
  availability_zone       = element(data.aws_availability_zones.azs.names, count.index)

  tags = {
    Name = var.candidate
    Sub = "${var.candidate}-subnet-private-${count.index + 1}"
  }
}

resource "aws_route_table" "vpc_route_table_public" {
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.internet_gateway.id
  }

  tags = {
    Name = var.candidate
  }
}

resource "aws_route_table_association" "rt-association-public" {
  count          = length(var.subnet_cidr_public)
  subnet_id      = element(aws_subnet.public.*.id, count.index)
  route_table_id = aws_route_table.vpc_route_table_public.id

}

resource "aws_route_table" "vpc_route_table_private" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  tags = {
    Name = var.candidate
  }
}
#---------------------------------------------------------------
#create the route table association for the nat gw on the vpc and the private subnets
#--------------------------------------------------------------------
resource "aws_route_table_association" "rt_association_private" {
  count          = length(var.subnet_cidr_private)
  subnet_id      = element(aws_subnet.private.*.id, count.index)
  route_table_id = aws_route_table.vpc_route_table_private.id

}
