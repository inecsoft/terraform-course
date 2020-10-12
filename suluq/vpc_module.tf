module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.env}-${var.project}"
  cidr = "10.0.0.0/16"
  
  enable_dns_hostnames = true
  enable_dns_support   = true

  azs             = ["${var.AWS_REGION}a", "${var.AWS_REGION}b", "${var.AWS_REGION}c"]
  private_subnets = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
  one_nat_gateway_per_az = false
 
  enable_vpn_gateway = true
  
  enable_dhcp_options               = true
  dhcp_options_domain_name          = "${var.env}-${var.project}"
  #dhcp_options_domain_name_servers = ["127.0.0.1", "8.8.8.8"]


  tags = {
    Name = "${var.env}-${var.project}"
    Environment = "${var.env}"
  }
}
