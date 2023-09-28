#Associates a Direct Connect Connection with a LAG.
/* resource "aws_dx_connection" "dx_connection" {
  name = "dx_connection"
  bandwidth = "1Gbps"
  location = tolist(data.aws_dx_locations.available.location_codes)[7]
  tags     = {
    "Name" = "dx_connection"
  }
}

resource "aws_dx_lag" "dx_lag" {
  name = "dx_lag"
  connections_bandwidth = "1Gbps"
  location = tolist(data.aws_dx_locations.available.location_codes)[7] #7 =Interxion DUB2, Dublin, IRL
  tags     = {
    "Name" = "dx_lag"
  }

}

resource "aws_dx_connection_association" "dx_connection_association" {
  connection_id = aws_dx_connection.dx_connection.id
  lag_id = aws_dx_lag.dx_lag.id
}

output "direct-connect-locations" {
  description = "available direct-connect-locations"
  value       = data.aws_dx_locations.available.location_codes
} */
#------------------------------------------------------------------------------------------------------------------
 resource "aws_dx_connection" "dx_connection" {
  name = "direct_connect_connection"
  #Valid values: 50Mbps, 100Mbps, 200Mbps, 300Mbps, 400Mbps, 500Mbps, 1Gbps, 2Gbps, 5Gbps, 10Gbps and 100Gbps
  bandwidth = "1Gbps"
  location = tolist(data.aws_dx_locations.available.location_codes)[7]
  tags     = {
    "Name" = "direct_connect_connection"
  }
}

resource "aws_dx_lag" "dx_lag" {
  name = "dx_lag"
  connections_bandwidth = "1Gbps"
  location = tolist(data.aws_dx_locations.available.location_codes)[7] #7 =Interxion DUB2, Dublin, IRL
  tags     = {
    "Name" = "dx_lag"
  }

}

  #"TCSH" #london

resource "aws_dx_connection_association" "dx_connection_association" {
  connection_id = aws_dx_connection.dx_connection.id
  lag_id = aws_dx_lag.dx_lag.id
}

resource "aws_dx_gateway" "dx_gateway" {
  name = "direct_connect_gateway"
  amazon_side_asn = "64512"
}

resource "aws_dx_gateway_association" "dx_gateway_association" {
  dx_gateway_id = aws_dx_gateway.dx_gateway.id
  #vpn_gateway_id = aws_vpn_gateway.vpn_gateway.id

  associated_gateway_id = aws_ec2_transit_gateway.tgw.id

  allowed_prefixes = [
    "10.0.0.0/30",
    "10.1.0.0/30",
  ]

}
output "direct-connect-locations" {
  description = "available direct-connect-locations"
  value       = data.aws_dx_locations.available.location_codes
}
#-------------------------------------------------------------------------------------------------------------------

#Associates a Direct Connect Gateway with a VGW.
/* resource "aws_dx_gateway" "dx_gateway" {
  name = "dx_gateway"
  amazon_side_asn = "64512"
}

resource "aws_vpc" "vpc" {
  cidr_block = "10.255.255.0/28"
}

resource "aws_vpn_gateway" "vpn_gateway" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_dx_gateway_association" "dx_gateway_association" {
  dx_gateway_id = aws_dx_gateway.dx_gateway.id
  vpn_gateway_id = aws_vpn_gateway.vpn_gateway.id
} */