#----------------------------------------------------------------------------------------------
output "RDS_PASSWORD" {
  value  = random_password.password.result
}
#----------------------------------------------------------------------------------------------
output "manage-IPAddress" {
  value = aws_instance.manage.public_ip
}
#----------------------------------------------------------------------------------------------
output "RDS-endpoint" {
  value = aws_db_instance.postgresdb.endpoint
}
#----------------------------------------------------------------------------------------------
output "vpc_id" {
  description = "The ID of the VPC"
  value       = module.vpc.vpc_id
}
#----------------------------------------------------------------------------------------------
# Subnets
output "private_subnets" {
  description = "List of IDs of private subnets"
  value       = module.vpc.private_subnets
}
#----------------------------------------------------------------------------------------------
output "public_subnets" {
  description = "List of IDs of public subnets"
  value       = module.vpc.public_subnets
}
#----------------------------------------------------------------------------------------------
output "db_sg_id" {
  description = "security group id"
  value       = aws_security_group.allow-postgresdb.id
}
#----------------------------------------------------------------------------------------------

