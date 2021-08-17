#------------------------------------------------------------------------------------------
module "aurora-mysql" {
  source  = "terraform-aws-modules/rds-aurora/aws"
  version = "~> 3.0"

  name                  = "${local.default_name}-aurora-mysql"
  engine                = "aurora-mysql"
  engine_version        = "5.7.12"
  instance_type         = "db.t3.small"
  instance_type_replica = "db.t3.small"

  vpc_id = module.vpc.vpc_id
  #db_subnet_group_name  = 
  subnets               = module.vpc.private_subnets
  create_security_group = true
  #A list of Security Group ID's to allow access to
  #allowed_security_groups = []
  #allowed_cidr_blocks   = module.vpc.private_subnets_cidr_blocks

  #iam_database_authentication_enabled = true
  #Name for an automatically created database on cluster creation
  database_name          = "${local.default_name}-aurora-mysql"
  username               = "${local.default_name}-aurora-mysql"
  password               = random_password.master.result
  create_random_password = false

  #	A List of ARNs for the IAM roles to associate to the RDS Cluster
  iam_roles = [aws_iam_role.iam-role-rds-to-lambda.arn]

  #The ARN for the KMS encryption key
  #kms_key_id =

  replica_count         = 1
  replica_scale_enabled = true
  replica_scale_min     = 1
  replica_scale_max     = 3

  monitoring_interval           = 60
  iam_role_name                 = "${local.default_name}-enhanced-monitoring"
  iam_role_use_name_prefix      = true
  iam_role_description          = "${local.default_name}- RDS enhanced monitoring IAM role"
  iam_role_path                 = "/autoscaling/"
  iam_role_max_session_duration = 7200

  # S3 import https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Integrating.LoadFromS3.html
  s3_import = {
    source_engine_version = "5.7.12"
    bucket_name           = aws_s3_bucket.s3-backup-rds.id
    ingestion_role        = aws_iam_role.s3_import.arn
  }

  apply_immediately   = true
  skip_final_snapshot = true

  db_parameter_group_name         = aws_db_parameter_group.db-parameter-group.id
  db_cluster_parameter_group_name = aws_rds_cluster_parameter_group.rds-cluster-parameter-group.id
  enabled_cloudwatch_logs_exports = ["audit", "error", "general", "slowquery"]

  tags = {
    Name = "${local.default_name}-aurora-mysql"
  }
}
#------------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-rds-to-lambda" {
  name = "${local.default_name}-iam-role-rds-to-lambda"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Sid" : "",
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "rds.amazonaws.com"
          },
          "Action" : "sts:AssumeRole"
        }
      ]
  })

  tags = {
    Name = "${local.default_name}-iam-role-rds-to-lambda"
  }
}
#------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-rds-to-lambda" {
  statement {
    sid    = "iamRoleRdsToLambda"
    effect = "Allow"
    actions = [
      "lambda:InvokeFunction"
    ]

    resources = [
      aws_lambda_function.lambda-function.arn
    ]
  }
}
#------------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-rds-to-lambda" {
  name   = "${local.default_name}-iam-policy-rds-to-lambda"
  path   = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc-rds-to-lambda.json
}
#------------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-policy-attach-rds-to-lambda" {
  role       = aws_iam_role.iam-role-rds-to-lambda.name
  policy_arn = aws_iam_policy.iam-policy-rds-to-lambda.arn
}
#------------------------------------------------------------------------------------------
resource "aws_db_parameter_group" "db-parameter-group" {
  name        = "${local.default_name}-aurora-db-57-parameter-group"
  family      = "aurora-mysql5.7"
  description = "${local.default_name}-aurora-db-57-parameter-group"

  tags = {
    Name = "${local.default_name}-db-parameter-group"
  }
}
#------------------------------------------------------------------------------------------
# resource "aws_rds_cluster_parameter_group" "rds-cluster-parameter-group" {
#   name        = "${local.default_name}-aurora-57-cluster-parameter-group"
#   family      = "aurora-mysql5.7"
#   description = "${local.default_name}-aurora-57-cluster-parameter-group"

#   tags        = {
#     Name = "${local.default_name}-rds-cluster-parameter-group"
#   }
# }
#------------------------------------------------------------------------------------------
#aws_default_lambda_role = aws_iam_role.iam-role-rds-to-lambda.arn
#https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Reference.html

resource "aws_rds_cluster_parameter_group" "rds-cluster-parameter-group" {
  name        = "${local.default_name}-aurora-57-cluster-parameter-group"
  family      = "aurora-mysql5.7"
  description = "${local.default_name}-aurora-57-cluster-parameter-group"

  parameter {
    name  = "aws_default_lambda_role"
    value = aws_iam_role.iam-role-rds-to-lambda.arn
  }

  tags = {
    Name = "${local.default_name}-rds-cluster-parameter-group"
  }
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_resource_id" {
  description = "The Resource ID of the cluster"
  value       = module.aurora-mysql.this_rds_cluster_resource_id
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_endpoint" {
  description = "The cluster endpoint"
  value       = module.aurora-mysql.this_rds_cluster_endpoint
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_reader_endpoint" {
  description = "The cluster reader endpoint"
  value       = module.aurora-mysql.this_rds_cluster_reader_endpoint
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_database_name" {
  description = "Name for an automatically created database on cluster creation"
  value       = module.aurora-mysql.this_rds_cluster_database_name
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_master_password" {
  description = "The master password"
  value       = module.aurora-mysql.this_rds_cluster_master_password
  sensitive   = true
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_port" {
  description = "The port"
  value       = module.aurora-mysql.this_rds_cluster_port
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_master_username" {
  description = "The master username"
  value       = module.aurora-mysql.this_rds_cluster_master_username
}
#------------------------------------------------------------------------------------------
# aws_rds_cluster_instance
output "this_rds_cluster_instance_endpoints" {
  description = "A list of all cluster instance endpoints"
  value       = module.aurora-mysql.this_rds_cluster_instance_endpoints
}
#------------------------------------------------------------------------------------------
output "this_rds_cluster_instance_ids" {
  description = "A list of all cluster instance ids"
  value       = module.aurora-mysql.this_rds_cluster_instance_ids
}
#------------------------------------------------------------------------------------------
# aws_security_group
output "this_security_group_id" {
  description = "The security group ID of the cluster"
  value       = module.aurora-mysql.this_security_group_id
}
#------------------------------------------------------------------------------------------