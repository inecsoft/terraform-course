#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_kms_key" "kms-key" {
  description             = "kms key to use with cloudtrail"
  enable_key_rotation     = true
  policy                  = data.aws_iam_policy_document.iam-policy-doc-kms-key-cloudtrail.json
  
  tags = {
    Environment = var.environment
    Project     = var.project
    Name        = "aws-cloudtrail"
  }
}
#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-alias" {
  name          = "alias/cloudtrail-key"
  target_key_id = aws_kms_key.kms-key.key_id
}
#-----------------------------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-kms-key-cloudtrail" {
  statement {
    sid       = "Enable IAM User Permissions"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["kms:*"]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.id}:root"]
    }
  }

  statement {
    sid       = "Allow CloudTrail to encrypt logs"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["kms:GenerateDataKey*"]

    condition {
      test     = "StringLike"
      variable = "kms:EncryptionContext:aws:cloudtrail:arn"
      values   = ["arn:aws:cloudtrail:*:${data.aws_caller_identity.current.id}:trail/*"]
    }

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }
  }

  statement {
    sid       = "Allow CloudTrail to describe key"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["kms:DescribeKey"]

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }
  }

  statement {
    sid       = "Allow principals in the account to decrypt log files"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "kms:Decrypt",
      "kms:ReEncryptFrom",
    ]

    condition {
      test     = "StringEquals"
      variable = "kms:CallerAccount"
      values   = [ data.aws_caller_identity.current.id ]
    }

    condition {
      test     = "StringLike"
      variable = "kms:EncryptionContext:aws:cloudtrail:arn"
      values   = ["arn:aws:cloudtrail:*:${data.aws_caller_identity.current.id}:trail/*"]
    }

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }

  statement {
    sid       = "Allow alias creation during setup"
    effect    = "Allow"
    resources = ["*"]
    actions   = ["kms:CreateAlias"]

    condition {
      test     = "StringEquals"
      variable = "kms:CallerAccount"
      values   = [ data.aws_caller_identity.current.id ]
    }

    condition {
      test     = "StringEquals"
      variable = "kms:ViaService"
      values   = ["ec2.${var.AWS_REGION}.amazonaws.com"]
    }

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }

  statement {
    sid       = "Enable cross account log decryption"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "kms:Decrypt",
      "kms:ReEncryptFrom",
    ]

    condition {
      test     = "StringEquals"
      variable = "kms:CallerAccount"
      values   = [data.aws_caller_identity.current.id]
    }

    condition {
      test     = "StringLike"
      variable = "kms:EncryptionContext:aws:cloudtrail:arn"
      values   = ["arn:aws:cloudtrail:*:${data.aws_caller_identity.current.id}:trail/*"]
    }

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}
#-----------------------------------------------------------------------------------------------------------------------------