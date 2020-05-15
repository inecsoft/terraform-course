##################################################
# Create an IAM role to allow enhanced monitoring
##################################################
#----------------------------------------------------------------------------
resource "aws_iam_role" "rds_enhanced_monitoring_db" {
  name_prefix        = "rds-enhanced-monitoring-db-"
  assume_role_policy = data.aws_iam_policy_document.rds_enhanced_monitoring.json
}
#----------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "rds_enhanced_monitoring_db" {
  role       = aws_iam_role.rds_enhanced_monitoring_db.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}
#----------------------------------------------------------------------------
data "aws_iam_policy_document" "rds_enhanced_monitoring" {
  statement {
    actions = [
      "sts:AssumeRole",
    ]

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["monitoring.rds.amazonaws.com"]
    }
  }
}
#----------------------------------------------------------------------------
#lambda vpc role and role policy
#----------------------------------------------------------------------------
resource "aws_iam_role" "lambda-vpc-role" {
    name               = "${local.default_name}-lambda-vpc-role"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------
resource "aws_iam_role_policy" "lambda-vpc-role-policy" {
  name = "${local.default_name}-lambda-vpc-role-policy"
  role = aws_iam_role.lambda-vpc-role.id

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents",
                "ec2:CreateNetworkInterface",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DeleteNetworkInterface"
            ],
            "Resource": "*"
        }
    ]
  },
  {
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
             "rds-db:connect"
         ],
         "Resource": [
             "${aws_db_instance.postgresdb.arn}"
         ]
      }
   ]
  }
      
  EOF
}
#----------------------------------------------------------------------------
#recomended
#----------------------------------------------------------------------------
data "aws_caller_identity" "current" {}
#----------------------------------------------------------------------------
output "account_id" {
  value = "${data.aws_caller_identity.current.account_id}"
}
#----------------------------------------------------------------------------
resource "aws_iam_role" "rds-proxy-role" {
  name               = "${local.default_name}-rds-proxy-role"
  path               = "/service-role/"
  assume_role_policy = <<POLICY
  {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "rds.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
   ]
  }
  POLICY
}
#----------------------------------------------------------------------------
data "aws_kms_alias" "kms" {
  name = "alias/aws/secretsmanager"
}
#----------------------------------------------------------------------------
resource "aws_iam_role_policy" "rds-proxy-role-policy" {
  name = "${local.default_name}-rds-proxy-role-policy"
  role = aws_iam_role.rds-proxy-role.id

  policy = <<-EOF
  {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "GetSecretValue",
            "Action": [
                "secretsmanager:GetSecretValue"
            ],
            "Effect": "Allow",
            "Resource": [
                "${aws_secretsmanager_secret_version.secret_version.arn}"
            ]
        },
        {
            "Sid": "DecryptSecretValue",
            "Action": [
                "kms:Decrypt"
            ],
            "Effect": "Allow",
            "Resource": [
                "${data.aws_kms_alias.kms.arn}"
            ],
            "Condition": {
                "StringEquals": {
                    "kms:ViaService": "secretsmanager.${var.AWS_REGION}.amazonaws.com"
                }
            }
        }
    ]
  }
  EOF
}
#----------------------------------------------------------------------------

