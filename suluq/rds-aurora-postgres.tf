#############
# RDS Aurora
#############
module "aurora" {
  source         = "terraform-aws-modules/rds-aurora/aws"
  name           = "${local.default_name}-aurora-postgresql"
  engine         = "aurora-postgresql"
  engine_mode    = "provisioned" //global, parallelquery, provisioned, serverless
  engine_version = "11.4"
  instance_type  = terraform.workspace == "prod" ? var.prod-db-instance-type : var.dev-db-instance-type
  username       = "suluqadmin"
  password       = var.db-password
  database_name  = "suluqdb"

  subnets = module.vpc.private_subnets
  vpc_id  = module.vpc.vpc_id

  replica_count             = 1
  replica_scale_enabled     = true
  replica_scale_cpu         = "80"
  replica_scale_connections = "700"
  replica_scale_min         = 1
  replica_scale_max         = 5

  apply_immediately = true

  deletion_protection     = false
  backup_retention_period = 35
  skip_final_snapshot     = true
  //snapshot_identifier             = "${var.env}-${var.project}-db"

  //When to perform DB backups	
  preferred_backup_window = "02:00-03:00"
  //When to perform DB maintenance
  preferred_maintenance_window = "sun:04:00-sun:05:00"

  kms_key_id        = aws_kms_key.suluq-kms-db.arn
  storage_encrypted = true
  //allowed_security_groups         = aws_security_group.suluq-aurora-postgres-sg.id
  //iam_roles                     = ""

  monitoring_interval             = 10
  performance_insights_enabled    = true
  performance_insights_kms_key_id = aws_kms_key.suluq-kms-db.arn
  security_group_description      = "access to port 5432 from webservers and bastion only"


  auto_minor_version_upgrade = true
  db_parameter_group_name    = aws_db_parameter_group.aurora_db_postgres11_parameter_group.id

  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.aurora_cluster_postgres11_parameter_group.id
  //  enabled_cloudwatch_logs_exports = ["audit", "error", "general", "slowquery"]

  tags = {
    Name        = "${local.default_name}-aurora-db"
    Environment = "${terraform.workspace}"

  }
}

resource "aws_db_parameter_group" "aurora_db_postgres11_parameter_group" {
  name        = "${terraform.workspace}-aurora-db-postgres11-parameter-group"
  family      = "aurora-postgresql11"
  description = "aurora-db-postgres11-parameter-group"
}

resource "aws_rds_cluster_parameter_group" "aurora_cluster_postgres11_parameter_group" {
  name        = "${terraform.workspace}-aurora-postgres11-cluster-parameter-group"
  family      = "aurora-postgresql11"
  description = "aurora-postgres11-cluster-parameter-group"
}

############################
# Example of security group
############################
resource "aws_security_group" "app_servers" {
  name_prefix = "app-servers"
  description = "SG for application servers"
  vpc_id      = module.vpc.vpc_id

  ingress {
    security_groups = ["${aws_security_group.suluq_vpc_sg-alb.id}", "${aws_security_group.suluq_vpc_sg-bastion.id}"]
    from_port       = 80
    to_port         = 80
    protocol        = "TCP"
    #cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    security_groups = ["${aws_security_group.suluq_vpc_sg-bastion.id}"]
    from_port       = 22
    to_port         = 22
    protocol        = "TCP"
    #cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    #security_groups = ["${aws_security_group.suluq_inchora_vpc_sg-bastion.id}"]
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }


  tags = {
    Name = "${local.default_name}-app-servers-sg"

  }

}
#---------------------------------------------------------------------------------------------------


resource "aws_security_group_rule" "allow_access" {
  count                    = 2
  type                     = "ingress"
  from_port                = module.aurora.this_rds_cluster_port
  to_port                  = module.aurora.this_rds_cluster_port
  protocol                 = "tcp"
  source_security_group_id = element([aws_security_group.app_servers.id, aws_security_group.suluq_vpc_sg-bastion.id], count.index)
  security_group_id        = module.aurora.this_security_group_id
}
#------------------------------------------------------------------------------------------------------------------------------------------------------
output "this_rds_cluster_endpoint" {
  description = "The cluster endpoint"
  value       = module.aurora.this_rds_cluster_endpoint
}

output "this_rds_cluster_reader_endpoint" {
  description = "The cluster reader endpoint"
  value       = module.aurora.this_rds_cluster_reader_endpoint
}

output "this_rds_cluster_database_name" {
  description = "Name for an automatically created database on cluster creation"
  value       = module.aurora.this_rds_cluster_database_name
}

output "this_rds_cluster_master_password" {
  description = "The master password"
  value       = module.aurora.this_rds_cluster_master_password
}

output "this_rds_cluster_port" {
  description = "The port"
  value       = module.aurora.this_rds_cluster_port
}

output "this_rds_cluster_master_username" {
  description = "The master username"
  value       = module.aurora.this_rds_cluster_master_username
}

#------------------------------------------------------------------------------------------------------------------------------------------------------
