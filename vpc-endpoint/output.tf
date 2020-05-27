#-------------------------------------------------------------------------------------------------------
# VPC flow log - Cloudwatch logs (default)
#-------------------------------------------------------------------------------------------------------
#output "vpc_vpc_flow_log_id" {
#  description = "The ID of the Flow Log resource"
#  value       = module.vpc.vpc_flow_log_id
#}
#
#output "vpc_vpc_flow_log_destination_arn" {
#  description = "The ARN of the destination for VPC Flow Logs"
#  value       = module.vpc.vpc_flow_log_destination_arn
#}
#
#output "vpc_vpc_flow_log_destination_type" {
#  description = "The type of the destination for VPC Flow Logs"
#  value       = module.vpc.vpc_flow_log_destination_type
#}
#
#output "vpc_vpc_flow_log_cloudwatch_iam_role_arn" {
#  description = "The ARN of the IAM role used when pushing logs to Cloudwatch log group"
#  value       = module.vpc.vpc_flow_log_cloudwatch_iam_role_arn
#}


# NAT gateways
output "nat_public_ips" {
  description = "List of public Elastic IPs created for AWS NAT Gateway"
  value       = module.vpc.nat_public_ips
}
# VPC
output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}

# Subnets
output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}
output "private_route_table_ids" {
  description = "List of IDs of private route tables"
  value       = module.vpc.private_route_table_ids
}
#-------------------------------------------------------------------------------------------------------

