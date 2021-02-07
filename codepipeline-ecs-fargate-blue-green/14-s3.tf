#-------------------------------------------------------------------
# cache s3 bucket
#-------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-codebuild-cache" {
  bucket = "${local.default_name}-s3-bucket-codebuild-cache-${random_string.random.result}"
  acl    = "private"
  force_destroy = true

  tags = {
    Name = "${local.default_name}-s3-bucket-codebuild-cache-${random_string.random.result}"
  }
}
#-------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-artifacts" {
  bucket = "${local.default_name}-s3-bucket-artifacts-${random_string.random.result}"
  acl    = "private"
  force_destroy = true

  lifecycle_rule {
    id      = "clean-up"
    enabled = "true"

    expiration {
      days = 30
    }
  }
  tags = {
    Name = "${local.default_name}-s3-bucket-artifacts-${random_string.random.result}"
  }
}
#-------------------------------------------------------------------
resource "random_string" "random" {
  length  = 8
  special = false
  upper   = false
}
#-------------------------------------------------------------------
