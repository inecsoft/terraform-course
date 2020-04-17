##-----------------------------------------------------
##create a vpc 
##-----------------------------------------------------
#resource "aws_vpc" "my_vpc" {
#  count                = length(keys(var.vpc))
#  cidr_block           = lookup(var.vpc, element(keys(var.vpc), count.index))
#  instance_tenancy     = "default"
#  enable_dns_support   = "true"
#  enable_dns_hostnames = "true"
#  enable_classiclink   =  "false"
#  
#  tags = { 
#     Name =  "${element(keys(var.vpc), count.index)}"
#      env =  "TG"
#      num =  "${count.index}"
#  }
#}
#------------------------------------------------------------------------------------------
module "vpc1" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 2.0"

  name =  element(keys(var.vpc), 0)

  cidr = lookup(var.vpc, element(keys(var.vpc), 0))

  azs             = data.aws_availability_zones.azs.names 
  public_subnets =  lookup(var.public-subnets, element(keys(var.public-subnets), 0))
  private_subnets =  lookup(var.private-subnets, element(keys(var.private-subnets), 0))


  enable_nat_gateway = false 
  enable_vpn_gateway = false

  tags = {
    env = "TG"
  }
}

module "vpc2" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 2.0"

  name = element(keys(var.vpc), 1) 

  cidr = lookup(var.vpc, element(keys(var.vpc), 1))

  azs             = data.aws_availability_zones.azs.names 
  public_subnets =  lookup(var.public-subnets, element(keys(var.public-subnets), 1))
  private_subnets =  lookup(var.private-subnets, element(keys(var.private-subnets), 1))

  enable_nat_gateway = false 
  enable_vpn_gateway = false

  tags = {
    env = "TG"
  }
}
module "vpc3" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 2.0"

  name = element(keys(var.vpc), 2) 

  cidr = lookup(var.vpc, element(keys(var.vpc), 2))

  azs             = data.aws_availability_zones.azs.names 
  public_subnets =  lookup(var.public-subnets, element(keys(var.public-subnets), 2))
  private_subnets =  lookup(var.private-subnets, element(keys(var.private-subnets), 2))


  enable_nat_gateway = false 
  enable_vpn_gateway = false

  tags = {
    env = "TG"
  }
}
module "vpc4" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 2.0"

  name = element(keys(var.vpc), 3) 

  cidr = lookup(var.vpc, element(keys(var.vpc), 3))

  azs             = data.aws_availability_zones.azs.names 
  public_subnets =  lookup(var.public-subnets, element(keys(var.public-subnets), 3))
  private_subnets =  lookup(var.private-subnets, element(keys(var.private-subnets), 3))


  enable_nat_gateway = false 
  enable_vpn_gateway = false

  tags = {
    env = "TG"
  }
}
#----------------------------------------------------------------------------------------------------

