#------------------------------------------------------------------------------------------
module "vpc1" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~>5.1.2"

  name = element(keys(var.vpc), 1)

  cidr = lookup(var.vpc, element(keys(var.vpc), 1))

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = lookup(var.public-subnets, element(keys(var.public-subnets), 1))
  private_subnets = lookup(var.private-subnets, element(keys(var.private-subnets), 1))


  enable_nat_gateway = false
  enable_vpn_gateway = false

  #enable_ipv6                                    = true
  #private_subnet_assign_ipv6_address_on_creation = true
  #private_subnet_ipv6_prefixes                   = [0, 1, 2]

  tags = {
    env = "TG"
  }
}
#----------------------------------------------------------------------------------------------------
module "vpc2" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~>5.1.2"

  name = element(keys(var.vpc), 2)

  cidr = lookup(var.vpc, element(keys(var.vpc), 2))

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = lookup(var.public-subnets, element(keys(var.public-subnets), 2))
  private_subnets = lookup(var.private-subnets, element(keys(var.private-subnets), 2))

  enable_nat_gateway = false
  enable_vpn_gateway = false

  /* enable_ipv6                                    = true
  private_subnet_assign_ipv6_address_on_creation = true
  private_subnet_ipv6_prefixes                   = [0, 1, 2] */

  tags = {
    env = "TG"
  }
}
#----------------------------------------------------------------------------------------------------
module "vpc3" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~>5.1.2"

  name = element(keys(var.vpc), 3)

  cidr = lookup(var.vpc, element(keys(var.vpc), 3))

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = lookup(var.public-subnets, element(keys(var.public-subnets), 3))
  private_subnets = lookup(var.private-subnets, element(keys(var.private-subnets), 3))


  enable_nat_gateway = false
  enable_vpn_gateway = false

  enable_ipv6                                    = true
  private_subnet_assign_ipv6_address_on_creation = true
  private_subnet_ipv6_prefixes                   = [0, 1, 2]

  tags = {
    env = "TG"
  }
}
#----------------------------------------------------------------------------------------------------
module "vpc4" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~>5.1.2"

  name = element(keys(var.vpc), 4)

  cidr = lookup(var.vpc, element(keys(var.vpc), 4))

  azs             = data.aws_availability_zones.azs.names
  public_subnets  = lookup(var.public-subnets, element(keys(var.public-subnets), 4))
  private_subnets = lookup(var.private-subnets, element(keys(var.private-subnets), 4))


  enable_nat_gateway = false
  enable_vpn_gateway = false

  enable_ipv6                                    = true
  private_subnet_assign_ipv6_address_on_creation = true
  private_subnet_ipv6_prefixes                   = [0, 1, 2]

  tags = {
    env = "TG"
  }
}
#----------------------------------------------------------------------------------------------------

