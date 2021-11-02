#------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucked" {
  bucket = "my-bucket-inecsoft"
  #acl    = "private"

  acl = "public-read"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  versioning {
    enabled = true
  }
}
#------------------------------------------------------------------------------

