#--------------------------------------------------------------------------------------
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "dev"

  cidr = "10.10.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  public_subnets  = ["10.10.1.0/24", "10.10.2.0/24", "10.10.3.0/24"]
  private_subnets = ["10.10.101.0/24", "10.10.102.0/24", "10.10.103.0/24"]

#Single NAT Gateway
  enable_nat_gateway = true
  single_nat_gateway = true
  one_nat_gateway_per_az = false

  tags = {
    Owner       = "user"
    Environment = "dev"
    Name        = "teffaform vpc"
  }
}
#--------------------------------------------------------------------------------------

