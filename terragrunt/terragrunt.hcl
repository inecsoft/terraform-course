terraform {
  source = "tfr:///terraform-aws-modules/vpc/aws?version=5.0.0"
}


generate "provider" {
	path = "provider.tf"
	if_exists = "overwrite_terragrunt"
	contents = <<EOF
provider "aws" {
	profile = "ivan-arteaga-dev"
	region = "eu-west-1"
	default_tags {
		tags = {
			Owner         = "TFGM"
			ProductOwner  = "Ivan Pedro"
			BusinessOwner = "DCS"
			Product       = "secrets"
			Repo          = "secrect"
			Tech          = "terraform"
			Environment   = "dev"
		}
	}
}
EOF
}

# Indicate the input values to use for the variables of the module.
inputs = {
  name = "terragrunt-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true
  enable_vpn_gateway = false

}