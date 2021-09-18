#------------------------------------------------------------------------------
data "aws_kms_alias" "secret-kms-alias" {
  name = "alias/aws/secretsmanager"
}

data "aws_iam_user" "iam-user-manager" {
  user_name = "ivan.arteaga"
}
#------------------------------------------------------------------------------
resource "aws_kms_key" "kms-key" {
  description             = "custom master key that protects RDS database volumes, ec2, secrect,etc."
  deletion_window_in_days = 10
  key_usage               = "ENCRYPT_DECRYPT"
  is_enabled              = true
  enable_key_rotation     = true

  policy = data.aws_iam_policy_document.iam-policy-doc-kms.json

  tags = {
    Name = "${local.default_name}-kms-key"
  }
}
#------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/container-${random_string.random.result}"
  target_key_id = aws_kms_key.kms-key.key_id
}
#------------------------------------------------------------------------------
output "kms-alias-master" {
  value       = aws_kms_alias.kms-key-alias.arn
  description = "kms arn of the alias key"
}
#-----------------------------------------------------------------------------------
output "kms-custom-key" {
  value       = aws_kms_key.kms-key.arn
  description = "kms arn of the custom key"
}
#-------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-kms" {
  policy_id = "key-consolepolicy-3"
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
    sid    = "Allow access for Key Administrators"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [data.aws_iam_user.iam-user-manager.arn]
    }
    actions = [
      "kms:Create*",
      "kms:Describe*",
      "kms:Enable*",
      "kms:List*",
      "kms:Put*",
      "kms:Update*",
      "kms:Revoke*",
      "kms:Disable*",
      "kms:Get*",
      "kms:Delete*",
      "kms:TagResource",
      "kms:UntagResource",
      "kms:ScheduleKeyDeletion",
      "kms:CancelKeyDeletion",
    ]
    resources = [
      "*",
    ]
  }
  statement {
    sid    = "Allow use of the key"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [data.aws_iam_user.iam-user-manager.arn]
    }
    actions = [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*",
      "kms:DescribeKey"
    ]
    resources = [
      "*",
    ]
  }
  statement {
    sid    = "Allow attachment of persistent resources"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = [data.aws_iam_user.iam-user-manager.arn]
    }
    actions = [
      "kms:CreateGrant",
      "kms:ListGrants",
      "kms:RevokeGrant"
    ]
    resources = [
      "*",
    ]
    condition {
      test     = "Bool"
      variable = "kms:GrantIsForAWSResource"
      values   = ["true"]
    }

  }

}
#-------------------------------------------------------------------------------------------