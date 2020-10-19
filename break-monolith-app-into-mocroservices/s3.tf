#------------------------------------------------------------------------------
#
# cache s3 bucket
#
#------------------------------------------------------------------------------
resource "aws_s3_bucket" "codebuild-cache" {
  bucket = "codebuild-cache-${random_string.name.result}"
  acl    = "private"
}
#------------------------------------------------------------------------------
resource "aws_s3_bucket" "artifacts" {
  bucket = "artifacts-${random_string.name.result}"
  acl    = "private"

  lifecycle_rule {
    id      = "clean-up"
    enabled = "true"

    expiration {
      days = 30
    }
  }
}
#------------------------------------------------------------------------------
resource "random_string" "name" {
  length  = 8
  special = false
  upper   = false
}
#------------------------------------------------------------------------------