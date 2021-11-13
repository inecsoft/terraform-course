#-----------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-dumy-project" {
  bucket = "s3-bucket-dumy-project"
  acl    = "private"

  #force destroy for not prouction env
  force_destroy = true

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        # kms_master_key_id = aws_kms_key.kms-key.arn
        # sse_algorithm     = "aws:kms"
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Name = "s3-content-bucket"
  }
}
#-----------------------------------------------------------------------
output "bucket-name" {
  value = aws_s3_bucket.s3-bucket-dumy-project.id
}
# #-----------------------------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-access-log-cloudtrail" {
  bucket = "${local.default_name}-s3-bucket-access-log-cloudtrail"
  # acl    = "private"
  acl           = "log-delivery-write"
  request_payer = "BucketOwner"

  versioning {
    enabled    = false
    mfa_delete = false
  }

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "denyInsecureTransport",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": [
        "arn:aws:s3:::${local.default_name}-s3-bucket-access-log-cloudtrail/*",
        "arn:aws:s3:::${local.default_name}-s3-bucket-access-log-cloudtrail"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    }
  ]
}
POLICY

  force_destroy = true

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        # kms_master_key_id = aws_kms_key.kms-key.arn
        # sse_algorithm     = "aws:kms"
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-s3-bucket-access-log-cloudtrail"
  }
}
# #-----------------------------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-cloudtrail" {
  bucket        = "${local.default_name}-s3-bucket-cloudtrail"
  acl           = "private"
  force_destroy = true

  request_payer = "BucketOwner"

  versioning {
    enabled    = false
    mfa_delete = false
  }

  policy = data.aws_iam_policy_document.aws_cloudtrail_bucket_policy.json

  logging {
    target_bucket = aws_s3_bucket.s3-bucket-access-log-cloudtrail.id
    target_prefix = "log/"
  }
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.kms-key.arn
        sse_algorithm     = "aws:kms"
        # sse_algorithm     = "AES256"
      }
    }
  }
  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-s3-bucket-cloudtrail"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block_cloudtrail" {
  bucket = aws_s3_bucket.s3-bucket-cloudtrail.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}
# #-----------------------------------------------------------------------------------------------------------------------------
################### AWS Cloudtrail S3 ###################
# module "aws_cloudtrail_s3_bucket_access_logs" {
#   source                         = "terraform-aws-modules/s3-bucket/aws"
#   bucket                         = "${local.default_name}-s3-bucket-access-log-cloudtrail"
#   acl                            = "log-delivery-write"
#   attach_deny_insecure_transport_policy = true
#   block_public_acls                     = true
#   block_public_policy                   = true
#   ignore_public_acls                    = true
#   restrict_public_buckets               = true    

#   control_object_ownership              = true
#   object_ownership                      = "BucketOwnerPreferred"

#   server_side_encryption_configuration = {
#     rule = {
#       apply_server_side_encryption_by_default = {
#         sse_algorithm     = "AES256"
#       }
#     }
#   }  
#   tags = {
#     Createdby   = "Terraform"
#     Environment = local.default_name
#     Name        = "${local.default_name}-s3-bucket-access-log-cloudtrail"
#     Project     = var.project
#   }    
# }

# module "aws_cloudtrail_s3_bucket" {
#   source                                = "terraform-aws-modules/s3-bucket/aws"
#   bucket                                = "${local.default_name}-s3-bucket-cloudtrail"
#   policy                                = data.aws_iam_policy_document.aws_cloudtrail_bucket_policy.json
#   attach_policy = true
#   attach_deny_insecure_transport_policy = true
#   block_public_acls                     = true
#   block_public_policy                   = true
#   ignore_public_acls                    = true
#   restrict_public_buckets               = true  
#   control_object_ownership              = true
#   object_ownership                      = "BucketOwnerPreferred"  
#   logging = {
#     target_bucket = module.aws_cloudtrail_s3_bucket_access_logs.s3_bucket_id
#     target_prefix = "log/"
#   }

#   server_side_encryption_configuration = {
#     rule = {
#       apply_server_side_encryption_by_default = {
#         kms_master_key_id = aws_kms_key.kms-key.arn
#         sse_algorithm     = "aws:kms"
#       }
#     }
#   }


#   tags = {
#     Createdby   = "Terraform"
#     Environment = local.default_name
#     Name        = "${local.default_name}-s3-bucket-cloudtrail"
#     Project     = var.project
#   } 
# }

data "aws_iam_policy_document" "aws_cloudtrail_bucket_policy" {
  statement {
    sid    = "denyInsecureTransport"
    effect = "Deny"
    resources = [
      "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail",
      "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail/*"
    ]
    actions = ["s3:*"]
    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
  statement {
    sid       = "AWSCloudTrailAclCheck"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail"]
    actions   = ["s3:GetBucketAcl"]

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }
  }

  statement {
    sid       = "AWSCloudTrailWrite"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail/prefix/AWSLogs/${data.aws_caller_identity.current.account_id}/*"]
    actions   = ["s3:PutObject"]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }

    principals {
      type        = "Service"
      identifiers = ["cloudtrail.amazonaws.com"]
    }
  }
}
# #-----------------------------------------------------------------------------------------------------------------------------
##########################  AWS CONFIG S3  ###############################

resource "aws_s3_bucket" "s3-bucket-config" {
  bucket        = "${local.default_name}-config"
  acl           = "private"
  request_payer = "BucketOwner"

  versioning {
    enabled    = false
    mfa_delete = false
  }

  policy = data.aws_iam_policy_document.aws_config_bucket_policy.json

  force_destroy = true

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle_rule {
    id      = "log"
    enabled = true

    # prefix = "log/"

    tags = {
      rule      = "log"
      autoclean = "true"
    }

    transition {
      days          = 30
      storage_class = "STANDARD_IA" # or "ONEZONE_IA"
    }

    transition {
      days          = 60
      storage_class = "GLACIER"
    }

    expiration {
      days = 90
    }
  }

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-config"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block_config" {
  bucket = aws_s3_bucket.s3-bucket-config.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

#################################################################
# module "aws_config_s3_bucket" {
#   source                                = "terraform-aws-modules/s3-bucket/aws"
#   bucket                                = "${local.default_name}-config"
#   policy                                = data.aws_iam_policy_document.aws_config_bucket_policy.json
#   attach_policy                         = true
#   attach_deny_insecure_transport_policy = true
#   block_public_acls                     = true
#   block_public_policy                   = true
#   ignore_public_acls                    = true
#   restrict_public_buckets               = true    

#   control_object_ownership              = true
#   object_ownership                      = "BucketOwnerPreferred"

#   server_side_encryption_configuration = {
#     rule = {
#       apply_server_side_encryption_by_default = {
#         sse_algorithm     = "AES256"
#       }
#     }
#   }

#   lifecycle_rule = [
#     {
#       id      = "log"
#       enabled = true

#       expiration = {
#         days = 30
#       }
#     }
#   ]
#   tags = {
#     Createdby   = "Terraform"
#     Environment = "SecurityHub"
#     Name        = "${local.default_name}-config"
#     Project     = "Security Hub"
#   }
# }
#################################################################
data "aws_iam_policy_document" "aws_config_bucket_policy" {
  statement {
    sid    = "denyInsecureTransport"
    effect = "Deny"
    resources = [
      "arn:aws:s3:::${local.default_name}-config",
      "arn:aws:s3:::${local.default_name}-config/*"
    ]
    actions = ["s3:*"]
    condition {
      test     = "Bool"
      variable = "aws:SecureTransport"
      values   = ["false"]
    }
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  statement {
    sid       = "AWSConfigBucketPermissionsCheck"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-config"]
    actions   = ["s3:GetBucketAcl"]

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }

  statement {
    sid       = "AWSConfigBucketExistenceCheck"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-config"]
    actions   = ["s3:ListBucket"]

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }

  statement {
    sid       = " AWSConfigBucketDelivery"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-config/AWSLogs/${data.aws_caller_identity.current.account_id}/Config/*"]
    actions   = ["s3:PutObject"]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }
}

#################################################################
module "aws_guardduty_s3_bucket" {
  source                                = "terraform-aws-modules/s3-bucket/aws"
  bucket                                = "${local.default_name}-tfgm-aws-guardduty"
  policy                                = data.aws_iam_policy_document.aws_guardduty_bucket_policy.json
  attach_policy                         = true
  attach_deny_insecure_transport_policy = true
  block_public_acls                     = true
  block_public_policy                   = true
  ignore_public_acls                    = true
  restrict_public_buckets               = true

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }
  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-tfgm-aws-guardduty"
  }
}

# resource "aws_s3_bucket" "s3-bucket-aws_guardduty" {
#   bucket = "${local.default_name}-aws_guardduty"
#   acl    = "private"
#   request_payer               = "BucketOwner"

#   versioning {
#     enabled    = false
#     mfa_delete = false
#   }

#   policy = data.aws_iam_policy_document.aws_guardduty_bucket_policy.json

#   force_destroy = true

#   server_side_encryption_configuration {
#     rule {
#       apply_server_side_encryption_by_default {
#         sse_algorithm     = "AES256"
#       }
#     }
#   }


#   tags = {
#     Environment = local.default_name
#     Project     = var.project
#     Name        = "${local.default_name}--aws_guardduty"
#   }
# }
data "aws_iam_policy_document" "aws_guardduty_bucket_policy" {
  statement {
    sid = "Allow PutObject"
    actions = [
      "s3:PutObject"
    ]
    resources = [
      "${module.aws_guardduty_s3_bucket.s3_bucket_arn}/*"
    ]
    principals {
      type        = "Service"
      identifiers = ["guardduty.amazonaws.com"]
    }
  }

  statement {
    sid = "Allow GetBucketLocation"
    actions = [
      "s3:GetBucketLocation"
    ]
    resources = [
      module.aws_guardduty_s3_bucket.s3_bucket_arn
    ]
    principals {
      type        = "Service"
      identifiers = ["guardduty.amazonaws.com"]
    }
  }
}

#################################################################