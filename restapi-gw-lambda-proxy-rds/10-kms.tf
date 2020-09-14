#------------------------------------------------------------------------------
data "aws_kms_alias" "secret-kms-alias" {
  name = "alias/aws/secretsmanager"
}
#------------------------------------------------------------------------------
resource "aws_kms_key" "kms-key" {
  description             = "custom master key that protects RDS database volumes, ec2, secrect,etc." 
  deletion_window_in_days = 10
  key_usage               = "ENCRYPT_DECRYPT"
  is_enabled              = true
  enable_key_rotation     = true

  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Id": "auto-secretsmanager-1",
    "Statement": [
        {
            "Sid": "Allow access through AWS Secrets Manager for all principals in the account that are authorized to use AWS Secrets Manager",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:CreateGrant",
                "kms:DescribeKey"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "kms:CallerAccount": "${data.aws_iam_account_alias.current}",
                    "kms:ViaService": "secretsmanager.${var.AWS_REGION}.amazonaws.com"
                }
            }
        },
        {
            "Sid": "Allow direct access to key metadata to the account",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::${data.aws_iam_account_alias.current}:root"
            },
            "Action": [
                "kms:Describe*",
                "kms:Get*",
                "kms:List*",
                "kms:RevokeGrant"
            ],
            "Resource": "*"
        }
    ]
  }
  POLICY

}
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/rdsproxysecrectmanager"
  target_key_id = aws_kms_key.kms-key.key_id
}
#------------------------------------------------------------------------------
output "kms-alias-master" {
  value       = data.aws_kms_alias.secret-kms-alias.arn
  description = "kms arn of the alias key"
}
#-----------------------------------------------------------------------------------

output "kms-custom-key" {
  value       = aws_kms_key.kms-key.arn
  description = "kms arn of the custom key"
  
}
#-----------------------------------------------------------------------------------
