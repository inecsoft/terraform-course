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
