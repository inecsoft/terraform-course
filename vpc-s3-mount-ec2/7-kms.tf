#------------------------------------------------------------------------------
data "aws_kms_alias" "secret-kms-alias" {
  name = "alias/aws/secretsmanager"
}

data "aws_iam_user" "iam-user-manager" {
  user_name = "develop"
}
#------------------------------------------------------------------------------
resource "aws_kms_key" "kms-key" {
  description             = "custom master key that protects RDS database volumes, ec2, secrect,etc."
  deletion_window_in_days = 10
  key_usage               = "ENCRYPT_DECRYPT"
  is_enabled              = true
  enable_key_rotation     = true

  policy = data.aws_iam_policy_document.kms-policy-doc.json


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
  description = "kms arn of the alias key"
  value       = data.aws_kms_alias.secret-kms-alias.arn

}
#-----------------------------------------------------------------------------------
output "kms-custom-key-arn" {
  description = "kms arn of the custom key"
  value       = aws_kms_key.kms-key.arn
}
#-----------------------------------------------------------------------------------

# #-------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "kms-policy-doc" {
  policy_id = "key-s3object-ec2"
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