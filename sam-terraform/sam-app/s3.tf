
resource "aws_s3_bucket" "s3_bucket_cdn" {
  bucket = "${var.s3_bucket_cdn_name}"
  force_destroy               = false
}

resource "aws_s3_bucket_policy" "cloudfront_bucket_policy" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  policy = data.aws_iam_policy_document.s3_bucket_cdn_policy.json

}

data "aws_iam_policy_document" "s3_bucket_cdn_policy" {
  statement {

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.s3_bucket_cdn.arn}/*",
       "${aws_s3_bucket.s3_bucket_cdn.arn}",
    ]

    condition {
      test     = "ForAnyValue:StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "s3_bucket_cdn_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.bucket_ownership]

  bucket = aws_s3_bucket.s3_bucket_cdn.id
  acl    = "private"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_cdn_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  depends_on = [
    aws_s3_bucket.s3_bucket_cdn,
  ]

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
###############################################################################################################################

# terraform import aws_s3_bucket.bucket bucket-name
resource "aws_s3_bucket" "s3_bucket_cdn_logs" {
  force_destroy               = false
  bucket = "${var.s3_bucket_cdn_name}-logs"
}


resource "aws_s3_bucket_acl" "s3_bucket_cdn_logs_acl" {
  bucket = aws_s3_bucket.s3_bucket_cdn_logs.id
  acl    = "private"
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_cdn_logs_ownership_controls" {
  bucket = aws_s3_bucket.s3_bucket_cdn_logs.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}


resource "aws_s3_bucket_versioning" "s3_bucket_cdn_logs_versioning" {
  bucket = aws_s3_bucket.s3_bucket_cdn_logs.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_cdn_logs_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.s3_bucket_cdn_logs.id
  depends_on = [
    aws_s3_bucket.s3_bucket_cdn_logs,
  ]

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_logging" "s3_bucket_cdn_logging" {
  depends_on = [aws_s3_bucket.s3_bucket_cdn_logs]
  bucket     = aws_s3_bucket.s3_bucket_cdn.id

  target_bucket = aws_s3_bucket.s3_bucket_cdn_logs.id
  target_prefix = "s3-access-logs/"
}

#########################################################
output "URL_s3_bucket_cdn_domain_name" {
  description = "url_s3_bucket_cdn_domain_name"
  value       = aws_s3_bucket.s3_bucket_cdn.bucket_domain_name
}

output "URL_s3_bucket_cdn_id" {
  description = "url_s3_bucket_cdn_id"
  value       = aws_s3_bucket.s3_bucket_cdn.id
}

##################################################################
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
    "woff2" = "font/woff2"
  }
}

resource "aws_s3_object" "content_static" {
  for_each = fileset("${path.module}/issue-tracker/.next/static/", "**/*.*")

  bucket       = aws_s3_bucket.s3_bucket_cdn.id
  key          = "_next/static/${each.key}"
  source       = "${path.module}/issue-tracker/.next/static/${each.key}"
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag         = filemd5("${path.module}/issue-tracker/.next/static/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
}

resource "aws_s3_object" "content_puclic" {
  for_each = fileset("${path.module}/issue-tracker/public/", "**/*.*")

  bucket       = aws_s3_bucket.s3_bucket_cdn.id
  key          = "static/${each.key}"
  source       = "${path.module}/issue-tracker/public/${each.key}"
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag         = filemd5("${path.module}/issue-tracker/public/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
}