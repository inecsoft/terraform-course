#############################################################################
# RESOURCES
#############################################################################  

# Create security VPC

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "sec-vpc"
  cidr = var.vpc_cidr_range

  azs             = slice(data.aws_availability_zones.azs.names, 0, 2)
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets
  intra_subnets   = var.intra_subnets

  tags = {
    Environment = "all"
    Team        = "security"
  }
}

#############################################################################
# OUTPUTS
#############################################################################

output "vpc_id" {
  value = module.vpc.vpc_id
}
#############################################################################