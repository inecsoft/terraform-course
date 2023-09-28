#terraform import aws_customer_gateway.customer_gateway cgw-0e265223de573df41
#------------------------------------------------------------------------------------------------------
resource "aws_customer_gateway" "customer_gateway" {
  depends_on = [ aws_instance.instance_client ]
  provider   = aws.main
  bgp_asn    = 65000
  ip_address = aws_instance.instance_client.public_ip
  type       = "ipsec.1"

  tags = {
    Name = "main-customer-gateway"
    CI        = "terraform"
  }
}
#------------------------------------------------------------------------------------------------------
#Virtual Private Gateway config
resource "aws_vpn_gateway" "vpn_gateway" {
	provider   = aws.main
	tags = {
		Name = "main-vpn-gateway"
	}
}
#------------------------------------------------------------------------------------------------------
resource "aws_vpn_gateway_attachment" "vpn_attachment" {
	provider   = aws.main
	vpc_id         =  module.vpc2.vpc_id
	vpn_gateway_id = aws_vpn_gateway.vpn_gateway.id
}
#------------------------------------------------------------------------------------------------------

#------------------------------------------------------------------------------------------------------
#terraform state show aws_vpn_connection.vpn_connection
resource "aws_vpn_connection" "vpn_connection" {
  provider   = aws.main
  customer_gateway_id                     = aws_customer_gateway.customer_gateway.id
  local_ipv4_network_cidr                 = "10.1.0.0/16" #customer gateway site
  outside_ip_address_type                 = "PublicIpv4"
  remote_ipv4_network_cidr                = "10.2.0.0/16"

  static_routes_only                      = true

  tags                                    = {
		Name = "vpn_connection"
		CI = "terraform"
	}

  tags_all                                = {
		Name = "vpn_connection"
		CI = "terraform"
	}

  /* tunnel1_address                         = "52.214.146.236"
  tunnel1_bgp_holdtime                    = 0
  tunnel1_cgw_inside_address              = "169.254.75.186"
  tunnel1_dpd_timeout_seconds             = 0
  tunnel1_enable_tunnel_lifecycle_control = false
  tunnel1_ike_versions                    = []
  tunnel1_inside_cidr                     = "169.254.75.184/30"
  tunnel1_phase1_dh_group_numbers         = []
  tunnel1_phase1_encryption_algorithms    = []
  tunnel1_phase1_integrity_algorithms     = []
  tunnel1_phase1_lifetime_seconds         = 0
  tunnel1_phase2_dh_group_numbers         = []
  tunnel1_phase2_encryption_algorithms    = []
  tunnel1_phase2_integrity_algorithms     = []
  tunnel1_phase2_lifetime_seconds         = 0
  #tunnel1_preshared_key                   = (sensitive value)
  tunnel1_rekey_fuzz_percentage           = 0
  tunnel1_rekey_margin_time_seconds       = 0
  tunnel1_replay_window_size              = 0
  tunnel1_vgw_inside_address              = "169.254.75.185"
  tunnel2_address                         = "54.194.11.7"
  tunnel2_bgp_holdtime                    = 0
  tunnel2_cgw_inside_address              = "169.254.23.122"
  tunnel2_dpd_timeout_seconds             = 0
  tunnel2_enable_tunnel_lifecycle_control = false
  tunnel2_ike_versions                    = []
  tunnel2_inside_cidr                     = "169.254.23.120/30"
  tunnel2_phase1_dh_group_numbers         = []
  tunnel2_phase1_encryption_algorithms    = []
  tunnel2_phase1_integrity_algorithms     = []
  tunnel2_phase1_lifetime_seconds         = 0
  tunnel2_phase2_dh_group_numbers         = []
  tunnel2_phase2_encryption_algorithms    = []
  tunnel2_phase2_integrity_algorithms     = []
  ##tunnel2_phase2_lifetime_seconds         = 0
  #tunnel2_preshared_key                   = (sensitive value)
  tunnel2_rekey_fuzz_percentage           = 0
  ##tunnel2_rekey_margin_time_seconds       = 0
  ##tunnel2_replay_window_size              = 0
  ##tunnel2_vgw_inside_address              = "169.254.23.121" */
  tunnel_inside_ip_version                = "ipv4"
  type                                    = "ipsec.1"
  vpn_gateway_id                          = aws_vpn_gateway.vpn_gateway.id

  tunnel1_log_options {
    cloudwatch_log_options {
      log_enabled = false
		}
	}

  tunnel2_log_options {
    cloudwatch_log_options {
      log_enabled = false
		}
	}
}

#echo aws_vpn_connection.vpn_connection.vgw_telemetry| terraform console
output "vpn_connection_status" {
  description = "show a set of information for vpn_connection status"
  value       = aws_vpn_connection.vpn_connection.vgw_telemetry
}
