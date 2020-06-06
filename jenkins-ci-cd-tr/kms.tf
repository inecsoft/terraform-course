#--------------------------------------------------------------------
resource "aws_kms_key" "kms" {
    description              = "Default master key that protects my S3 objects when no other key is defined"
    deletion_window_in_days = 10
    customer_master_key_spec = "SYMMETRIC_DEFAULT"
    enable_key_rotation      = true
    is_enabled               = true
    key_usage                = "ENCRYPT_DECRYPT"
    policy                   = <<POLICY
{
    "Version": "2012-10-17",
    "Id": "auto-s3-2",
    "Statement": [
        {
            "Sid": "Allow access through S3 for all principals in the account that are authorized to use S3",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*",
            "Condition": {
                "StringEquals": {
                    "kms:ViaService": "s3.eu-west-1.amazonaws.com",
                    "kms:CallerAccount": "230941810881"
                }
            }
        },
        {
            "Sid": "Allow direct access to key metadata to the account",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::230941810881:root"
            },
            "Action": [
                "kms:Describe*",
                "kms:Get*",
                "kms:List*"
            ],
            "Resource": "*"
        }
    ]
}
POLICY
   
   tags     = {
     Env = terraform.workspace
   }
}
#------------------------------------------------------------------------------------
#terraform import aws_kms_alias.kms-alias alias/aws/s3
#------------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-alias" {
  name          = "alias/${local.default_name}-s3"
  target_key_id = aws_kms_key.kms.key_id
}
#------------------------------------------------------------------------------------

