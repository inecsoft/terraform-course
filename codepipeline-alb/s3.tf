#--------------------------------------------------------------------------------
# cache s3 bucket
#--------------------------------------------------------------------------------
resource "aws_s3_bucket" "codebuild-cache" {
  bucket = "${local.default_name}-codebuild-cache-${random_string.random.result}"
  acl    = "private"
}
#--------------------------------------------------------------------------------
resource "aws_s3_bucket" "artifacts" {
  bucket = "${local.default_name}-artifacts-${random_string.random.result}"
  acl    = "private"

  lifecycle_rule {
    id      = "clean-up"
    enabled = "true"

    expiration {
      days = 30
    }
  }
}
#--------------------------------------------------------------------------------
resource "random_string" "random" {
  length  = 8
  special = false
  upper   = false
}

#--------------------------------------------------------------------------------
##################################################################
# Bucket log for Application Load Balancer
##################################################################
module "log_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 1.0"

  bucket                         = "${local.default_name}-alb-logs"
  acl                            = "log-delivery-write"
  force_destroy                  = true
  attach_elb_log_delivery_policy = true

  lifecycle_rule = [
    {
      id      = "log"
      enabled = true
      prefix  = "log/"

      tags = {
        rule      = "log"
        autoclean = "true"
      }

      transition = [
        {
          days          = 30
          storage_class = "ONEZONE_IA"
          }, {
          days          = 60
          storage_class = "GLACIER"
        }
      ]

      expiration = {
        days = 90
      }

      noncurrent_version_expiration = {
        days = 30
      }
    },
    {
      id                                     = "log1"
      enabled                                = true
      prefix                                 = "log1/"
      abort_incomplete_multipart_upload_days = 7

      noncurrent_version_transition = [
        {
          days          = 30
          storage_class = "STANDARD_IA"
        },
        {
          days          = 60
          storage_class = "ONEZONE_IA"
        },
        {
          days          = 90
          storage_class = "GLACIER"
        },
      ]

      noncurrent_version_expiration = {
        days = 300
      }
    },
  ]

}

output "this_s3_bucket_id" {
  description = "The name of the bucket."
  value       = module.log_bucket.this_s3_bucket_id
}

output "this_s3_bucket_arn" {
  description = "The ARN of the bucket. Will be of format arn:aws:s3:::bucketname."
  value       = module.log_bucket.this_s3_bucket_arn
}

output "this_s3_bucket_website_endpoint" {
  description = "The website endpoint, if the bucket is configured with a website. If not, this will be an empty string."
  value       = module.log_bucket.this_s3_bucket_website_endpoint
}
output "this_s3_bucket_bucket_domain_name" {
  description = "The bucket domain name. Will be of format bucketname.s3.amazonaws.com."
  value       = module.log_bucket.this_s3_bucket_bucket_domain_name
}
#-----------------------------------------------------------------------------------------------------------
data "aws_elb_service_account" "this" {}

resource "aws_s3_bucket" "codepipeline-alb-logs" {
  bucket        = "${local.default_name}-alb-logs"
  acl           = "private"
  policy        = data.aws_iam_policy_document.codepipeline-alb-logs.json
  force_destroy = true

#------------------------------------------------------------------------------
#enable life cycle policy
#on the config folder
#------------------------------------------------------------------------------
  lifecycle_rule {
      prefix  = "AWSLogs/"
          enabled = true

      noncurrent_version_transition {
            days          = 30
          storage_class = "STANDARD_IA"
      }

      noncurrent_version_transition {
        days          = 60
        storage_class = "GLACIER"
      }

      noncurrent_version_expiration {
            days = 90
      }
    }
}


data "aws_iam_policy_document" "codepipeline-alb-logs" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.this.arn]
    }

    resources = [
      "arn:aws:s3:::codepipeline-alb-logs/*",
    ]
  }
}
#------------------------------------------------------------------------------------------------------