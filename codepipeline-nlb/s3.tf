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
data "aws_elb_service_account" "this" {}

resource "aws_s3_bucket" "codepipeline-nlb-logs" {
  bucket        = "${local.default_name}-nlb-logs"
  acl           = "private"
  policy        = data.aws_iam_policy_document.codepipeline-nlb-logs.json
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


data "aws_iam_policy_document" "codepipeline-nlb-logs" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.this.arn]
    }

    resources = [
      "arn:aws:s3:::codepipeline-nlb-logs/*",
    ]
  }
}
#------------------------------------------------------------------------------------------------------