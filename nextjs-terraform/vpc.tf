resource "aws_vpc" "vpc_client" {
  #provider             = aws.client
  cidr_block           = var.vpc_cidr_client
  instance_tenancy     = "default"
  enable_dns_support   = "true"
  enable_dns_hostnames = "true"

  tags = {
    Name = "vpc_client"
  }
}