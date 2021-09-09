#############################################################################
# RESOURCES
#############################################################################  

module "vpc_east" {
  source  = "terraform-aws-modules/vpc/aws"
  # version = "2.33.0"

  name = "prod-vpc-east"
  cidr = var.vpc_cidr_range_east

  azs            = slice(data.aws_availability_zones.azs_east.names, 0, 2)
  public_subnets = var.public_subnets_east

  # Database subnets
  database_subnets  = var.database_subnets_east
  database_subnet_group_tags = {
    subnet_type = "database"
  }

  providers = {
    aws = aws.east
  }

  tags = {
    Environment = "prod"
    Region      = "east"
    Team        = "infra"
  }

}
#############################################################################
module "vpc_west" {
  source  = "terraform-aws-modules/vpc/aws"
  # version = "2.33.0"

  name = "prod-vpc-west"
  cidr = var.vpc_cidr_range_west

  azs            = slice(data.aws_availability_zones.azs_west.names, 0, 2)
  public_subnets = var.public_subnets_west

  # Database subnets
  database_subnets  = var.database_subnets_west
  database_subnet_group_tags = {
    subnet_type = "database"
  }

  providers = {
    aws = aws.west
  }

  tags = {
    Environment = "prod"
    Region      = "west"
    Team        = "infra"
  }

}
#############################################################################
