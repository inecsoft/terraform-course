#---------------------------------------------------------------------------------------------------
#https://github.com/int128/terraform-aws-nat-instance
#---------------------------------------------------------------------------------------------------
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"

   name                 = "main"
   cidr                 = "10.0.0.0/16"
   azs                  = ["${var.AWS_REGION}a", "${var.AWS_REGION}b", "${var.AWS_REGION}c"]
   private_subnets      = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
   public_subnets       = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
   
#   private_subnets      = ["172.18.64.0/20", "172.18.80.0/20", "172.18.96.0/20"]
#   public_subnets       = ["172.18.128.0/20", "172.18.144.0/20", "172.18.160.0/20"]
   enable_dns_hostnames = true
}
#---------------------------------------------------------------------------------------------------
#on the dashboard check that action > networking> source/destination checks is desabled.
#---------------------------------------------------------------------------------------------------
module "nat" {
    source = "int128/nat-instance/aws"

    name                        = "main"
    vpc_id                      = module.vpc.vpc_id
    public_subnet               = module.vpc.public_subnets[0]
    private_subnets_cidr_blocks = module.vpc.private_subnets_cidr_blocks
    private_route_table_ids     = module.vpc.private_route_table_ids
    # Candidates of spot instance type for the NAT instance. This is used in the mixed instances policy
    instance_types              = ["t2.micro", "t3.nano", "t3a.nano"]
}
#---------------------------------------------------------------------------------------------------
