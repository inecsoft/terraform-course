#------------------------------------------------------------------------------
# data "aws_kms_alias" "secret-kms-alias" {
#   name = "alias/aws/secretsmanager"
# }
#------------------------------------------------------------------------------
resource "aws_kms_key" "kms-key" {
  description             = "custom master key that protects RDS database volumes, ec2, secrect,etc." 
  deletion_window_in_days = 10
  key_usage               = "ENCRYPT_DECRYPT"
  is_enabled              = true
  enable_key_rotation     = true

  policy =   data.aws_iam_policy_document.kms-policy-doc.json
  
  tags = {
    Name = "${local.default_name}-kms-key"
  }
}
#------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/${local.default_name}-${random_string.random.result}"
  target_key_id = aws_kms_key.kms-key.key_id
}
#------------------------------------------------------------------------------
# output "kms-alias-master" {
#   value       = data.aws_kms_alias.secret-kms-alias.arn
#   description = "kms arn of the alias key"
# }
#-----------------------------------------------------------------------------------
output "kms-custom-key" {
  value       = aws_kms_key.kms-key.arn
  description = "kms arn of the custom key"
}
#-------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "kms-policy-doc" {
  policy_id = "key-default-1"
  statement {
    sid    = "Enable IAM User Permissions"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
    actions = [
      "kms:*",
    ]
    resources = [
      "*",
    ]
  }
  statement {
    sid    = "Allow access through AWS Secrets Manager for all principals in the account that are authorized to use AWS Secrets Manager"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions = [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt",
      "kms:GenerateDataKey",
      "kms:CreateGrant",
      "kms:DescribeKey",
    ]
    resources = [
      "*",
    ]
	  condition {
      test     = "StringEquals"
      variable = "kms:CallerAccount"
      values   = [data.aws_caller_identity.current.account_id]
    }
    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["secretsmanager.${var.AWS_REGION}.amazonaws.com"]
    }
  }
  statement {
    sid = "Allow direct access to key metadata to the account"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
    actions = [
      "kms:Describe",
      "kms:Get",
      "kms:List",
      "kms:RevokeGrant",
    ]
    resources = [
      "*",
    ]

  }
}
#-------------------------------------------------------------------------------------------