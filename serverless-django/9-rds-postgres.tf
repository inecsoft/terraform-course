#------------------------------------------------------------------------------------------------------------------------
#create a subnet group for the RDS service
#---------------------------------------------------------------------------------
resource "aws_db_subnet_group" "postgresdb-subnet" {
  name        = "${local.default_name}-postgresdb-subnet"
  description = "RDS subnet group"
  subnet_ids  = module.vpc.private_subnets
}

resource "aws_db_parameter_group" "postgresdb-parameters" {
  name        = "${local.default_name}-postgresdb-params"
  family      = "postgres11"
  description = "postgresDB parameter group"

  #  parameter {
  #    name  = "max_allowed_packet"
  #    value = "16777216"
  #  }
}
#---------------------------------------------------------------------------------
#create RDS service 
#---------------------------------------------------------------------------------
resource "aws_db_instance" "postgresdb" {
  allocated_storage     = 10  # 100 GB of storage, gives us more IOPS than a lower number
  max_allocated_storage = 100 # enable storage autoscalling
  engine                = "postgres"
  engine_version        = "11.5"
  instance_class        = "db.t2.micro" # use micro if you want to use the free tier
  identifier            = "postgresdb"

  name     = var.credentials-postgres.dbname   # database name      
  username = var.credentials-postgres.username # username
  password = random_password.password.result   # password
  port     = var.credentials-postgres.port

  db_subnet_group_name   = aws_db_subnet_group.postgresdb-subnet.name
  parameter_group_name   = aws_db_parameter_group.postgresdb-parameters.name
  multi_az               = "false" # set to true to have high availability: 2 instances synchronized with each other
  vpc_security_group_ids = [aws_security_group.allow-db-access.id]

  #storage_type values gp2, io1
  storage_type = "gp2"
  #iops  =  "2000"

  #storage_encrypted = true
  # arn:aws:kms:<region>:<accountID>:key/<key-id>

  backup_retention_period = 30 # how long you're going to keep your backups
  #availability_zone         = aws_subnet.main-private-1.availability_zone # prefered AZ

  copy_tags_to_snapshot = true

  #final snapshot when executing terraform destroy
  #final_snapshot_identifier = "postgresdb-final-snapshot"     
  skip_final_snapshot = true

  # Specifies whether or not to create this database from a snapshot.
  # This correlates to the snapshot ID you'd find in the RDS console,
  #snapshot_identifier = "postgresdb-final-snapshot" 

  #enable enhanced monitoring 
  monitoring_interval = "30"
  monitoring_role_arn = aws_iam_role.rds_enhanced_monitoring_db.arn

  #enable performance insight
  performance_insights_enabled          = "true"
  performance_insights_retention_period = 7

  auto_minor_version_upgrade = true

  # Database Deletion Protection
  deletion_protection = false

  tags = {
    Name = "${local.default_name}-rds-postgres"
  }
}
#---------------------------------------------------------------------------------
output "RDS-Postgres-endpoint" {
  description = "RDS-Postgres-endpoint"
  value       = aws_db_instance.postgresdb.endpoint
}
#---------------------------------------------------------------------------------
output "RDS-Postgres-password" {
  description = "RDS-Postgres-password"
  value       = random_password.password.result
}
#---------------------------------------------------------------------------------