# aws auditmanager register-account \
# --kms-key arn:aws:kms:us-west-2:111122223333:key/1234abcd-12ab-34cd-56ef-1234567890ab \
# --delegated-admin-account 111122224444
resource "aws_auditmanager_account_registration" "auditmanager_account_registration" {
	# Deregister On Destroy = true
	deregister_on_destroy = false
	kms_key = aws_kms_key.kms_key.arn

	# delegated_admin_account =
}

data "aws_iam_role" "iam_role_auditmanager" {
  name = "AWSServiceRoleForAuditManager"
}

resource "aws_iam_role" "iam_role_auditmanager" {
  path               = "/service-role/"
  name               = "${local.default_name}-aws-auditmanager-role"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "auditmanager.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
POLICY
}

data "aws_iam_policy" "iam_policy_auditmanager" {
  name = "AWSAuditManagerAdministratorAccess"
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_auditmanager" {
  role       = aws_iam_role.aws_config_role.name
  # confirmed that exist
  policy_arn = data.aws_iam_policy.iam_policy_auditmanager.arn
}

# aws auditmanager get-controlv--control-id <value>
#terraform import aws_auditmanager_control.auditmanager_control abc123-de45
# resource "aws_auditmanager_control" "auditmanager_control" {
#   name = "auditmanager-control"

#   control_mapping_sources {
#     source_name          = "amc_control_mapping_source"
#     source_set_up_option = "Procedural_Controls_Mapping"
#     source_type          = "MANUAL"
#   }
# }

# resource "aws_auditmanager_framework" "auditmanager_framework" {
#   name = "auditmanager_framework"

#   control_sets {
#     name = "amf_control_sets"
#     controls {
#       id = aws_auditmanager_control.auditmanager_control.id
#     }
#     # controls {
#     #   id = aws_auditmanager_control.test_2.id
#     # }
#   }
# }

# resource "aws_auditmanager_assessment" "auditmanager_assessment" {
#   name = "auditmanager-assessment"

#   assessment_reports_destination {
#     destination      = "s3://${aws_s3_bucket.s3_bucket_auditmanager.id}"
#     destination_type = "S3"
#   }

#   framework_id = aws_auditmanager_framework.auditmanager_framework.id

#   roles {
#     role_arn  = aws_iam_role.auditmanager_assessment.arn
      # role_arn  = data.aws_iam_role.iam_role_auditmanager.arn
#     role_type = "PROCESS_OWNER"
#   }

#   scope {
#     aws_accounts {
#       id = data.aws_caller_identity.account.account_id
#     }
#     aws_services {
#       service_name = "S3"
#     }
#   }
# }

#-------------------------------------------------------------------------------------------
resource "aws_kms_key" "kms_key" {
  deletion_window_in_days = 7
  description             = "AWS auditmanager KMS Key"
  policy      = data.aws_iam_policy_document.iam-policy-doc-kms.json
}

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
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/aws_auditmanager"
  target_key_id = aws_kms_key.kms_key.key_id
}
#-------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3_bucket_auditmanager" {
  bucket              = "${local.default_name}-aws-bucket-auditmanager"
  force_destroy       = true
  object_lock_enabled = false
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_ownership_controls_auditmanager" {
  bucket = aws_s3_bucket.s3_bucket_auditmanager.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# resource "aws_s3_bucket_acl" "s3_bucket_auditmanager_acl" {
#   bucket = aws_s3_bucket.s3_bucket_auditmanager.id
#   acl    = "private"
# }

resource "aws_s3_bucket_versioning" "s3_bucket_auditmanager_versioning" {
  bucket = aws_s3_bucket.s3_bucket_auditmanager.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_auditmanager_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.s3_bucket_auditmanager.id

  rule {
    bucket_key_enabled = false

    apply_server_side_encryption_by_default {
      kms_master_key_id = null
      sse_algorithm     = "AES256"
    }
  }
}
#-------------------------------------------------------------------------------------------