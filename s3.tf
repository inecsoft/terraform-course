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
  depends_on = [ aws_s3_bucket.logging_bucket ]
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
/* https://dev-react-cors-spa.s3.eu-west-1.amazonaws.com/
dev-react-cors-spa.s3-website-eu-west-1.amazonaws.com */

output "s3-website-url" {
  description = "description"
  value       = aws_s3_bucket_website_configuration.s3_bucket_website_configuration.website_endpoint
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_ownership_controls" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


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
      "Sid": "AllowPublicAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:GetObject*",
      "Resource": [ "${aws_s3_bucket.s3_bucket_cdn.arn}/*", "${aws_s3_bucket.s3_bucket_cdn.arn}" ]
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_website_configuration" "s3_bucket_website_configuration" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id

  index_document {
    suffix = "index.html"
  }

  #default the handeling of errors to our react application by setting index.html as error document
  error_document {
    key = "index.html"
  }

}

#to improve security
/* resource "aws_s3_bucket_policy" "s3_bucket_cdn_acl_policy" {
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
          "AWS:SourceArn" : "${aws_cloudfront_distribution.s3_distribution.arn}"
        }
      }
    }
  ]
}
POLICY
} */

/* data "aws_iam_policy_document" "iam_policy_document_s3" {
  statement {
    actions = [
      "s3:GetObject",
    ]

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      "${aws_s3_bucket.s3_bucket_cdn.arn}/*",
    ]
  }
} */

#manual config
/* {
"Version"  : "2012-10-17",
"Statement" : [
  {
   "Action": "s3:GetObject",
   "Effect": "Allow",
   "Principal": "*",
     "Resource": ["arn:aws:s3:::dev-react-cors-spa/*"]
  }
]

} */


locals {
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
}

resource "aws_s3_object" "content" {
  for_each = fileset("${path.module}/web/build/", "**/*.*")

  bucket       = aws_s3_bucket.s3_bucket_cdn.id
  key          = each.key
  source       = "${path.module}/web/build/${each.key}"
  cache_control = trimprefix(".js", "${path.module}/web/build/${each.key}") == ".js" || trimprefix(".css", "${path.module}/web/build/${each.key}") == ".css" ? "max-age=31536000, public" : null
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag         = filemd5("${path.module}/web/build/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
}

output "bucket_name" {
  value = aws_s3_bucket.s3_bucket_cdn.id
}