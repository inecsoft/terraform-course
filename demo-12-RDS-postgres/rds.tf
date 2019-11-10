#-----------------------------------------------------------------------------------------------
#allows you to specify in what subnet that database will be in eu-west-1a and eu-west-1b if you 
#enable HA you will have RDS on both subnets.
#-----------------------------------------------------------------------------------------------
resource "aws_db_subnet_group" "postgresdb-subnet" {
  name        = "postgresdb-subnet"
  description = "RDS subnet group"
  subnet_ids  = [aws_subnet.main-private-1.id, aws_subnet.main-private-2.id]
}

#-----------------------------------------------------------------------------------------------
#allows you to specify parameters to cahnge settings in the database
#-----------------------------------------------------------------------------------------------
resource "aws_db_parameter_group" "postgresdb-parameters" {
  name        = "postgresdb-parameters"
  family      = "postgres11"
  description = "postgresDB parameter group"

#  parameter {
#    name  = "max_allowed_packet"
#    value = "16777216"
#  }
}

#-----------------------------------------------------------------------------------------------
#you can easy setup replication HA, automated snapshots (backups), security updates, easy instance replacement
#(for vertical scaling)
#supported databases mysql, postgresdb, postgresql, sql, oracle.
#-----------------------------------------------------------------------------------------------

#-----------------------------------------------------------------------------------------------
##############################################################
# Data sources to get VPC, subnets and security group details
##############################################################
#-----------------------------------------------------------------------------------------------
#####
# DB
#####
#-----------------------------------------------------------------------------------------------
module "master" {
  source = "terraform-aws-modules/rds/aws"

  identifier = var.RDS_DB_IDENTIFIER

  engine            = "postgres"
  engine_version    = "11.5"
  instance_class    = "db.t2.micro"
  allocated_storage = 5
  max_allocated_storage = 100
  #iops             = 2000 
  storage_encrypted = false
  multi_az          = false
  availability_zone = "eu-west-1b" #string

  #kms_key_id        = "arm:aws:kms:<region>:<account id>:key/<kms key id>"

  name =  var.RDS_DB_NAME

  # NOTE: Do NOT use 'user' as the value for 'username' as it throws:
  # "Error creating DB Instance: InvalidParameterValue: MasterUsername
  # user cannot be used as it is a reserved word used by the engine"
  username = var.RDS_USERNAME

  password = var.RDS_PASSWORD
  port     = "5432"

  vpc_security_group_ids = [aws_security_group.allow-postgresdb.id]
  
  
  db_subnet_group_name = aws_db_subnet_group.postgresdb-subnet.name
  #parameter_group_name = "postgres11.5"

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  # Enhanced Monitoring - see example for details on how to create the role
  # by yourself, in case you don't want to create it automatically
  monitoring_interval = "30"
  #monitoring_role_name = aws_iam_role.rds_enhanced_monitoring_db.name # not required 
  monitoring_role_arn  = aws_iam_role.rds_enhanced_monitoring_db.arn
  #create_monitoring_role = true

  #Specifies whether Performance Insights are enabled 
  performance_insights_enabled          = true
  performance_insights_retention_period = 7

  #disable backups to create DB faster
  backup_retention_period = 1

  #iam_database_authentication_enabled = true

  auto_minor_version_upgrade = true

  tags = {
    Owner       = "user"
    Environment = "dev"
  }

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  # DB subnet group
  #subnet_ids = aws_db_subnet_group.postgresdb-subnet.id

  # DB parameter group
  family = "postgres11"

  # DB option group
  major_engine_version = "11.5"

  # Snapshot name upon DB deletion
  #final_snapshot_identifier = "demodb"

  #Specifies whether or not to create this database from a snapshot.
  # This correlates to the snapshot ID you'd find in the RDS console, e.g: rds:production-2015-06-26-06-05.
  #snapshot_identifier       = "" #snapshot_identifier_id
 
  # Database Deletion Protection
  deletion_protection = false
}
#-----------------------------------------------------------------------------------------------
############
# Replica DB
############
#-----------------------------------------------------------------------------------------------
module "replica" {
  source = "terraform-aws-modules/rds/aws" 

  identifier = var.RDS_DB_R_IDENTIFIER
  #Source database. For cross-region use this_db_instance_arn
  replicate_source_db = module.master.this_db_instance_id

  engine            = "postgres"
  engine_version    = "11.5"
  instance_class    = "db.t2.micro"
  allocated_storage = 5
  max_allocated_storage = 100
  #iops             = 2000 
  storage_encrypted = false
  multi_az          = false

  #availability_zone = "eu-west-1a" #string
  # Username and password must not be set for replicas
  username = ""
  password = ""
  port     = "5432" 

  vpc_security_group_ids = [aws_security_group.allow-postgresdb.id]

  maintenance_window = "Tue:00:00-Tue:03:00"
  backup_window      = "03:00-06:00"

  # disable backups to create DB faster
  backup_retention_period = 0

  # Not allowed to specify a subnet group for replicas in the same region
  create_db_subnet_group = false

  create_db_option_group    = false
  create_db_parameter_group = false
}
#-----------------------------------------------------------------------------------------------

