#------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucked" {
  bucket = "my-bucket-inecsoft"
  acl    = "private"


  #------------------------------------------------------------------------------
  #enable life cycle policy
  #on the config folder
  #------------------------------------------------------------------------------
  lifecycle_rule {
    prefix  = "config/"
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


  #------------------------------------------------------------------------------
  #Using versioning
  #------------------------------------------------------------------------------
  versioning {
    enabled = true
  }
  #------------------------------------------------------------------------------
  #enable encryption 
  #------------------------------------------------------------------------------
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}
#------------------------------------------------------------------------------

resource "aws_s3_bucket_public_access_block" "s3-bucked" {
  bucket = aws_s3_bucket.s3-bucked.id

  ignore_public_acls      = true
  restrict_public_buckets = true
  block_public_acls       = true
  block_public_policy     = true
}

#------------------------------------------------------------------------------

