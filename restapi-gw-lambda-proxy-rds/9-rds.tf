#####
# DB
#####
module "db" {
  source = "terraform-aws-modules/rds/aws"
  #server name
  identifier = "dbproxy"

  # All available versions: http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt
  engine            = "mysql"
  engine_version    = "5.7.19"
  instance_class    = "db.t2.micro"
  allocated_storage = 5
  storage_encrypted = false

  #kms_key_id        = aws_kms_key.kms-key.id
  #db name
  name     = var.credentials.dbname
  username = var.credentials.username
  password = var.credentials.password
  port     = var.credentials.port

  vpc_security_group_ids = [aws_security_group.allow-mysql.id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  multi_az = false

  # disable backups to create DB faster
  backup_retention_period = 0

  enabled_cloudwatch_logs_exports = ["audit", "general"]

  # DB subnet group
  subnet_ids = module.vpc.private_subnets

  # DB parameter group
  family = "mysql5.7"

  # DB option group
  major_engine_version = "5.7"

  # Snapshot name upon DB deletion
  #final_snapshot_identifier = "demodb"

  # Database Deletion Protection
  deletion_protection = false

  parameters = [
    {
      name  = "character_set_client"
      value = "utf8"
    },
    {
      name  = "character_set_server"
      value = "utf8"
    }
  ]

  options = [
    {
      option_name = "MARIADB_AUDIT_PLUGIN"

      option_settings = [
        {
          name  = "SERVER_AUDIT_EVENTS"
          value = "CONNECT"
        },
        {
          name  = "SERVER_AUDIT_FILE_ROTATIONS"
          value = "37"
        },
      ]
    },
  ]

  tags = {
      Name = "${local.default_name}"
  }
}
#--------------------------------------------------------------------------------
output "db-endpoint" {
  value = module.db.this_db_instance_endpoint
}
#--------------------------------------------------------------------------------