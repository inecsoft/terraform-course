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
# RESOURCES
#############################################################################

# Create the peering connection

/* resource "aws_vpc_peering_connection" "main" {
  provider      = aws.main
  vpc_id        = module.vpc2.vpc_id
  peer_vpc_id   = module.vpc1.vpc_id
  peer_owner_id = data.aws_caller_identity.client.account_id
  peer_region   = var.AWS_REGION_client
  auto_accept   = false

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Name" = "peering-connection-qa-vpc-main-resquester"
  }

  tags_all = {
    "Name" = "peering-connection-qa-vpc-main-resquester"
  }
}


resource "aws_vpc_peering_connection_accepter" "main" {
  provider                  = aws.client
  vpc_peering_connection_id = aws_vpc_peering_connection.main.id
  auto_accept               = true

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    "Name" = "peering-connection-dev-vpc-client-accepter"
  }

  tags_all = {
    "Name" = "peering-connection-dev-vpc-client-accepter"
  }
} */
#############################################################################
#terraform import aws_vpc_peering_connection_options.foo pcx-111aaa111
resource "aws_vpc_peering_connection" "client" {
  provider      = aws.client
  vpc_id        = module.vpc1.vpc_id
  peer_vpc_id   = module.vpc2.vpc_id
  peer_owner_id = data.aws_caller_identity.main.account_id
  peer_region   = var.AWS_REGION_main
  auto_accept   = false

  tags = {
    "Name" = "peering-connection-dev-vpc-client-requester"
  }
  tags_all = {
    "Name" = "peering-connection-dev-vpc-client-requester"
  }
}

resource "aws_vpc_peering_connection_accepter" "client" {
  provider                  = aws.main
  vpc_peering_connection_id = aws_vpc_peering_connection.client.id
  auto_accept               = true
  tags = {
    "Name" = "peering-connection-qa-vpc-main-accepter"
  }
  tags_all = {
    "Name" = "peering-connection-qa-vpc-main-accepter"
  }

}
#############################################################################