#-------------------------------------------------------------------------------------------------
module "tgw" {
  source  = "terraform-aws-modules/transit-gateway/aws"
  version = "~> 1.0"

  name            = "${local.default_name}-tgw-custom"
  description     = "TGW default route shared with several other AWS accounts"
  amazon_side_asn = 64532

  enable_dns_support                     = true
  enable_vpn_ecmp_support                = true
  enable_default_route_table_association = true
  enable_default_route_table_propagation = true

  enable_auto_accept_shared_attachments = true // When "true" there is no need for RAM resources if using multiple AWS accounts

  vpc_attachments = {
    vpc1 = {
      vpc_id      = module.vpc1.vpc_id
      subnet_ids  = module.vpc1.public_subnets
      dns_support = true
      #      ipv6_support                                    = true

    },
    vpc2 = {
      vpc_id      = module.vpc2.vpc_id
      subnet_ids  = module.vpc2.public_subnets
      dns_support = true
      #      ipv6_support                                    = true

    },
  }

  ram_allow_external_principals = true
  ram_principals                = [307990089504]

  tags = {
    env = "TG"
  }
}
#-------------------------------------------------------------------------------------------------

