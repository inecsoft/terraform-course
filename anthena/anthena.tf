resource "aws_s3_bucket" "s3_bucket_anthena" {
  bucket = "ca-anthena-cloudtrail-db-tfgm"
}

resource "aws_kms_key" "kms_key" {
  deletion_window_in_days = 7
  description             = "Athena KMS Key"
  policy      = data.aws_iam_policy_document.iam-policy-doc-kms.json
}

#-------------------------------------------------------------------------------------------
data "aws_iam_user" "iam-user-manager" {
  user_name = "ivan.arteaga"
}

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

#-------------------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/anthena"
  target_key_id = aws_kms_key.kms_key.key_id
}

resource "aws_athena_workgroup" "athena_workgroup" {
  name = "athena_workgroup"

  configuration {
    result_configuration {
      encryption_configuration {
        encryption_option = "SSE_KMS"
        kms_key_arn       = aws_kms_key.kms_key.arn
      }
    }
  }
}

resource "aws_athena_database" "athena_database" {
  name   = "cloudtraildbtfgm"
  bucket = aws_s3_bucket.s3_bucket_anthena.id
}


resource "aws_athena_named_query" "athena_named_query_db_create" {
  name      = "cloudtraildbtfgm"
  workgroup = aws_athena_workgroup.athena_workgroup.id
  database  = aws_athena_database.athena_database.name
  query     = "CREATE DATABASE IF NOT EXISTS cloudtraildbtfgm COMMENT 'CLOUDTRAIL DATABASE' LOCATION 'S3://ca-anthena-cloudtrail-db-tfgm/cloudtrail' WITHDBPROPERTIES ('CREATOR'='IVANPEDRO', 'COMPANY'='TFGM', 'CREATED'='2023')"
}

/* resource "aws_athena_named_query" "athena_named_query_db" {
  name      = "bar"
  workgroup = aws_athena_workgroup.athena_workgroup.id
  database  = aws_athena_database.athena_database.name
  query     = "SELECT * FROM ${aws_athena_database.athena_database.name} limit 10;"
} */

