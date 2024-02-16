resource "aws_vpc" "ecs_vpc" {
  cidr_block           = var.vpc_cidr
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"

  tags = {
    Name = "ECS VPC"
  }
}

resource "aws_subnet" "ecs_subnets" {
  count                   = length(var.subnet_cidr)
  vpc_id                  = aws_vpc.ecs_vpc.id
  cidr_block              = element(var.subnet_cidr, count.index)
  map_public_ip_on_launch = "true"
  availability_zone       = element(data.aws_availability_zones.azs.names, count.index)

  tags = {
    Name = "ecs_subnet-${count.index + 1}"
  }
}

resource "aws_internet_gateway" "ecs-gw" {
  vpc_id = aws_vpc.ecs_vpc.id

  tags = {
    Name = "ECS IGW"
  }
}

resource "aws_route_table" "ecs_route_table" {
  vpc_id = aws_vpc.ecs_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ecs-gw.id
  }

  tags = {
    Name = "ECS Route Table"
  }
}

resource "aws_route_table_association" "ecs-rt-association" {
  count          = length(var.subnet_cidr)
  subnet_id      = element(aws_subnet.ecs_subnets.*.id, count.index)
  route_table_id = aws_route_table.ecs_route_table.id
}

resource "aws_security_group" "ecs_security_group" {
  name   = "ecs_security_group"
  vpc_id = aws_vpc.ecs_vpc.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "TCP"
    cidr_blocks = [var.vpc_cidr]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

