#############################################################################
# VARIABLES
#############################################################################

/* variable "destination_vpc_id" {
  type = string
}

variable "peer_role_arn" {
  type = string
}


#############################################################################
# PROVIDER
#############################################################################

provider "aws" {
  # version = "~> 2.0"
  region  = var.region
  alias   = "peer"
  profile = "infra"

  assume_role {
    role_arn = var.peer_role_arn
  }

} */

#############################################################################
# DATA SOURCES
#############################################################################

data "aws_caller_identity" "main" {
  provider = aws.main
}

#############################################################################
# RESOURCES
#############################################################################

# Create the peering connection

resource "aws_vpc_peering_connection" "main" {
  vpc_id        = module.vpc1.vpc_id
  peer_vpc_id   = module.vpc2.vpc_id
  peer_owner_id = data.aws_caller_identity.main.account_id
  peer_region   = var.AWS_REGION
  auto_accept   = false

}

resource "aws_vpc_peering_connection_accepter" "main" {
  provider                  = aws.main
  vpc_peering_connection_id = aws_vpc_peering_connection.main.id
  auto_accept               = true

}
#############################################################################