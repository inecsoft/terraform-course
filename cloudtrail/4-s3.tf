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
        sse_algorithm     = "AES256"
      }
    }
  }

  tags = {
    Name = "s3-content-bucket"
  }
}
#-----------------------------------------------------------------------
output "bucket-name" {
  value =  aws_s3_bucket.s3-bucket-dumy-project.id
}
# #-----------------------------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-access-log-cloudtrail" {
  bucket = "${local.default_name}-s3-bucket-access-log-cloudtrail"
  # acl    = "private"
  acl    = "log-delivery-write"
  request_payer               = "BucketOwner"

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
        sse_algorithm     = "AES256"
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
        "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail/*",
        "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail"
      ],
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    },
    {
      "Sid": "AWSCloudTrailAclCheck",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "s3:GetBucketAcl",
      "Resource": "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail"
    },
    {
      "Sid": "AWSCloudTrailWrite",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail/prefix/AWSLogs/${data.aws_caller_identity.current.account_id}/*",
      "Condition": {
        "StringEquals": {
          "s3:x-amz-acl": "bucket-owner-full-control"
        }
      }
    }
  ]
}
POLICY

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

# data "aws_iam_policy_document" "aws_cloudtrail_bucket_policy" {
#   statement {
#     sid       = "AWSCloudTrailAclCheck"
#     effect    = "Allow"
#     resources = ["arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail"]
#     actions   = ["s3:GetBucketAcl"]

#     principals {
#       type        = "Service"
#       identifiers = ["cloudtrail.amazonaws.com"]
#     }
#   }

#   statement {
#     sid       = "AWSCloudTrailWrite"
#     effect    = "Allow"
#     resources = ["arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail/AWSLogs/${data.aws_caller_identity.current.account_id}/*"]
#     actions   = ["s3:PutObject"]

#     condition {
#       test     = "StringEquals"
#       variable = "s3:x-amz-acl"
#       values   = ["bucket-owner-full-control"]
#     }

#     principals {
#       type        = "Service"
#       identifiers = ["cloudtrail.amazonaws.com"]
#     }
#   }
# }
# #-----------------------------------------------------------------------------------------------------------------------------