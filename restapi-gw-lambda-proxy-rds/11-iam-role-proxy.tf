#--------------------------------------------------------------------------------
resource "aws_iam_role" "rds-proxy-role" {
    name               = "rds-proxy-role"
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
#------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "rds-proxy-policy-attachment" {
    name       = "rds-proxy-policy-attachment"
    policy_arn = aws_iam_role.rds-proxy-policy.arn
    groups     = []
    users      = []
    roles      = [aws_iam_role.rds-proxy-role.name]
}
#------------------------------------------------------------------------------
resource "aws_iam_policy" "rds-proxy-policy" {
    name        = "rds-proxy-policy"
    path        = "/service-role/"
    description = "Allows RDS Proxy access to database connection credentials"
    policy      = <<POLICY
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
        "${aws_secretsmanager_secret.proxy-secret.arn}"
      ]
    },
    {
      "Sid": "DecryptSecretValue",
      "Action": [
        "kms:Decrypt"
      ],
      "Effect": "Allow",
      "Resource": [
        "${data.aws_kms_alias.secret-kms-alias.arn}",
        "${aws_kms_key.kms-key.arn}"
      ],
      "Condition": {
        "StringEquals": {
          "kms:ViaService": "secretsmanager.${var.AWS_REGION}.amazonaws.com"
        }
      }
    }
  ]
}
POLICY
}
#------------------------------------------------------------------------------
