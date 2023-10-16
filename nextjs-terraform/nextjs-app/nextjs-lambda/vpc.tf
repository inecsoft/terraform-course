resource "aws_vpc" "vpc" {
  #provider             = aws.client
  cidr_block           = var.dev-vpc_cidr
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"

  tags = {
    Name = "vpc"
  }
}