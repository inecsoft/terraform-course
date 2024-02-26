output "public_subnet_ids" {
	description = "public subnets ids for the vpc"
	value = aws_subnet.ecs_subnets_public[*].id
}

output "private_subnet_ids" {
	description = "private subnets ids for the vpc"
	value = aws_subnet.ecs_subnets_private[*].id
}

output "security_group_ids" {
	description = "security group id for the vpc"
	value = aws_security_group.ecs_security_group.id
}