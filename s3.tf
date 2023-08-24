resource "aws_s3_bucket" "logging_bucket" {
  bucket = "dev-react-cors-spa-logging"
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "logging_bucket_ownership_controls" {
  bucket = aws_s3_bucket.logging_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_acl" "logging_bucket_acl" {
  bucket = aws_s3_bucket.logging_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "logging_bucket_versioning" {
  bucket = aws_s3_bucket.logging_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "logging_bucket_server_side_encryption_configuration" {
  bucket =  aws_s3_bucket.logging_bucket.id
  depends_on = [
    aws_s3_bucket.logging_bucket,
  ]

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

################################################
#terraform import aws_s3_bucket.s3_bucket_cdn calabs-s3cf-ivan
resource "aws_s3_bucket" "s3_bucket_cdn" {
  bucket = "dev-react-cors-spa"
  force_destroy = true

}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_ownership_controls" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

/* resource "aws_s3_bucket_acl" "s3_bucket_cdn_acl" {
  depends_on = [
    aws_s3_bucket.s3_bucket_cdn,
    #aws_s3_bucket_public_access_block.s3_bucket_public_access_block
  ]

	bucket = aws_s3_bucket.s3_bucket_cdn.id
	acl    = "private" # or can be "public-read"
} */

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration" {
  bucket =  aws_s3_bucket.s3_bucket_cdn.id
  depends_on = [
    aws_s3_bucket.s3_bucket_cdn,
  ]

  rule {
    apply_server_side_encryption_by_default {

      sse_algorithm = "AES256"
      /* kms_master_key_id = aws_kms_key.mykey.arn
      sse_algorithm     = "aws:kms" */
    }
  }
}

resource "aws_s3_bucket_logging" "s3_bucket_cdn_logging" {
  depends_on = [ aws_s3_bucket.logging_bucket ]
  bucket = aws_s3_bucket.s3_bucket_cdn.id

  target_bucket = aws_s3_bucket.logging_bucket.id
  target_prefix = "s3-access-logs/"
}

resource "aws_s3_bucket_policy" "s3_bucket_cdn_acl_policy" {
	depends_on = [ aws_s3_bucket.s3_bucket_cdn ]
	bucket = aws_s3_bucket.s3_bucket_cdn.id
  #policy = data.aws_iam_policy_document.iam_policy_document_s3.json
    policy = <<POLICY
{
  "Version": "2012-10-17",
  "Id": "MyPolicy",
  "Statement": [
    {
      "Sid": "PolicyForCloudFrontPrivateContent",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject*",
      "Resource": "${aws_s3_bucket.s3_bucket_cdn.arn}/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::911328334795:distribution/E1UCL0QC2YEHUB"
        }
      }
    }
  ]
}
POLICY

              /* "AWS:SourceArn" = "arn:aws:cloudfront::${data.aws_caller_identity.current.account_id}:distribution/${aws_cloudfront_distribution.cf_distribution.id}" */
}

/* data "aws_iam_policy_document" "iam_policy_document_s3" {
  statement {
    principal = {
      type        = "AWS"
      identifiers = ["*"]

    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.s3_bucket_cdn.arn}/*",
    ]
  }
} */

/* resource "aws_s3_object" "s3_object" {
  for_each = fileset("src/gallery/", "*")
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  key = each.value
  source = "src/gallery/${each.value}"
  etag = filemd5("src/gallery/${each.value}")
  server_side_encryption = "AES256"
} */

/* locals {
  mime_types = {
    "css"  = "text/css"
    "html" = "text/html"
    "ico"  = "image/vnd.microsoft.icon"
    "js"   = "application/javascript"
    "json" = "application/json"
    "map"  = "application/json"
    "png"  = "image/png"
    "svg"  = "image/svg+xml"
    "txt"  = "text/plain"
    "jpeg" = "image/jpeg"
    "DS_Store" = "text/plain"
    "gif" = "image/gif"
  }
} */

output "bucket_name" {
  value = aws_s3_bucket.s3_bucket_cdn.id
}