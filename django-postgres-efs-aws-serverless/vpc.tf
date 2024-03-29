resource "aws_vpc" "ecs_vpc" {
  cidr_block           = var.vpc_cidr
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"

  tags = {
    Name = "ECS VPC"
  }
}

resource "aws_subnet" "ecs_subnets_public" {
  count                   = length(var.subnet_cidr_public)
  vpc_id                  = aws_vpc.ecs_vpc.id
  cidr_block              = element(var.subnet_cidr_public, count.index)
  map_public_ip_on_launch = "true"
  availability_zone       = element(data.aws_availability_zones.azs.names, count.index)

  tags = {
    Name = "ecs_subnet-public-${count.index + 1}"
  }
}

resource "aws_subnet" "ecs_subnets_private" {
  count                   = length(var.subnet_cidr_private)
  vpc_id                  = aws_vpc.ecs_vpc.id
  cidr_block              = element(var.subnet_cidr_private, count.index)
  map_public_ip_on_launch = "false"
  availability_zone       = element(data.aws_availability_zones.azs.names, count.index)

  tags = {
    Name = "ecs_subnet-private-${count.index + 1}"
  }
}

resource "aws_internet_gateway" "ecs-gw" {
  vpc_id = aws_vpc.ecs_vpc.id

  tags = {
    Name = "ECS IGW"
  }
}

resource "aws_eip" "nat" {
  domain = "vpc"
  tags = {
    Name = "EIP_NAT"
  }
}

#------------------------------------
#create  nat gw to provide internet access to the private subnets
#--------------------------------
resource "aws_nat_gateway" "nat_gw" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.ecs_subnets_public[0].id
  depends_on    = [aws_internet_gateway.ecs-gw]

  tags = {
    Name = "NAT_GATEWAY"
  }
}
#---------------------------------------------------------------
resource "aws_route_table" "ecs_route_table_public" {
  vpc_id = aws_vpc.ecs_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ecs-gw.id
  }

  tags = {
    Name = "ECS Route Table Public"
  }
}

resource "aws_route_table_association" "ecs-rt-association_public" {
  count          = length(var.subnet_cidr_public)
  subnet_id      = element(aws_subnet.ecs_subnets_public.*.id, count.index)
  route_table_id = aws_route_table.ecs_route_table_public.id
}


resource "aws_route_table" "ecs_route_table_private" {
  vpc_id = aws_vpc.ecs_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat_gw.id
  }

  tags = {
    Name = "ECS Route Table private"
  }
}

resource "aws_route_table_association" "ecs-rt-association_private" {
  count          = length(var.subnet_cidr_private)
  subnet_id      = element(aws_subnet.ecs_subnets_private.*.id, count.index)
  route_table_id = aws_route_table.ecs_route_table_private.id
}
#---------------------------------------------------------------

resource "aws_security_group" "ecs_security_group" {
  name   = "ecs_security_group"
  vpc_id = aws_vpc.ecs_vpc.id

  #  No SSH ingress rule since Fargate tasks are abstracted and not directly accessible via SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "TCP"#
    description = "allows ssh access to the ecs container from the vpc"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "TCP"
    cidr_blocks = var.subnet_cidr_public
  }

  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "TCP"
    description = "allows http access from personal ip address to the container"
    cidr_blocks = [ local.workstation-external-cidr ]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    description = "allows http access on port 80 to all addresses to the container"
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    description = "allows all access from alb to the container"
    security_groups = [aws_security_group.ecs_alb_security_group.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

