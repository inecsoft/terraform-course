#-------------------------------------------------------------------
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${local.default_name}-vpc"
  cidr = "10.0.0.0/16"

  azs             = slice(data.aws_availability_zones.azs.names, 0, 3)
  private_subnets = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false



  #VPC Flow Logs (Cloudwatch log group and IAM role will be created) needs fixing
  #  enable_flow_log                      = true
  #  create_flow_log_cloudwatch_log_group = true
  #  create_flow_log_cloudwatch_iam_role  = true

  tags = {
    "Name" = "${local.default_name}-vpc"
  }

  # elasticache_subnet_tags = {
  #   "Name" = "${local.default_name}-net-cache"
  # }

  public_subnet_tags = {
    "Name" = "${local.default_name}-net-public"
  }

  private_subnet_tags = {
    "Name" = "${local.default_name}-net-private"
  }
}

#-------------------------------------------------------------------