#-----------------------------------------------------------------------------
data "aws_security_group" "default" {
  name   = "default"
  vpc_id = module.main-vpc.vpc_id
}
#-----------------------------------------------------------------------------
module "main-vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "main-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]

  enable_dns_hostnames = true
  enable_dns_support   = true
  enable_vpn_gateway   = true

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false


  # VPC endpoint for S3
  enable_s3_endpoint = true

  # VPC endpoint for DynamoDB
  enable_dynamodb_endpoint = true

  # VPC endpoint for  apigw
  enable_apigw_endpoint              = true
  apigw_endpoint_private_dns_enabled = true
  apigw_endpoint_security_group_ids  = [data.aws_security_group.default.id]

  tags = {
    Name = "main-vpc"
  }
}
#-----------------------------------------------------------------------------
