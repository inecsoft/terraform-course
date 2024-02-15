#########################################################################################
resource "aws_s3_bucket" "s3_bucket_kinesis" {
  bucket = "s3bucketkinesis"
  force_destroy = true

}

#

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration" {
	bucket = aws_s3_bucket.s3_bucket_kinesis.id

	rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "s3_bucket_lifecycle_configuration" {
  bucket = aws_s3_bucket.s3_bucket_kinesis.id

  rule {
    id = "Ad Campaign"

    status = "Enabled"

     transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }

  rule {
    id = "Ad Campaign  2"

    status = "Enabled"

    expiration {
      days = 365
    }
  }
}
##############################################################################################

resource "aws_s3_bucket" "s3_bucket_web_kinesis" {
  bucket = "awswebsiteloungebeerfirehose"
  force_destroy = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration_web_kinesis" {
  bucket = aws_s3_bucket.s3_bucket_web_kinesis.id

	rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_website_configuration" "s3_bucket_website_configuration_web_kinesis" {
  bucket = aws_s3_bucket.s3_bucket_web_kinesis.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }

}

resource "aws_s3_bucket_versioning" "s3_bucket_versioning_web_kinesis" {
  bucket = aws_s3_bucket.s3_bucket_web_kinesis.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_ownership_controls_web_kinesis" {
  bucket = aws_s3_bucket.s3_bucket_web_kinesis.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block_web_kinesis" {
  bucket = aws_s3_bucket.s3_bucket_web_kinesis.id

  ignore_public_acls      = false
  restrict_public_buckets = false
  block_public_acls       = false
  block_public_policy     = false
}


resource "aws_s3_bucket_policy" "s3_bucket_policy_web_kinesis" {
  bucket = aws_s3_bucket.s3_bucket_web_kinesis.id
  policy = data.aws_iam_policy_document.aws_iam_policy_document_web_kinesis.json
}

data "aws_iam_policy_document" "aws_iam_policy_document_web_kinesis" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    effect = "Allow"
    actions = [
      "s3:GetObject",
    ]
    resources = [
      "${aws_s3_bucket.s3_bucket_web_kinesis.arn}",
      "${aws_s3_bucket.s3_bucket_web_kinesis.arn}/*",
    ]
  }

  statement {
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    effect = "Allow"
    actions = [
      "s3:GetObject",
    ]
    resources = [
      "${aws_s3_bucket.s3_bucket_web_kinesis.arn}",
      "${aws_s3_bucket.s3_bucket_web_kinesis.arn}/*",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = ["${aws_cloudfront_distribution.s3_distribution.arn}"]
    }
  }

}

# data "template_file" "s3_public_policy" {
#   template = file("policies/s3public.json")
# }

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
    "zip"  = "application/x-zip-compressed"
  }
}

resource "aws_s3_object" "s3_bucket_web_kinesis_content" {
  for_each = fileset("${path.module}/LougeBeer/", "**/*.*")

  bucket       = aws_s3_bucket.s3_bucket_web_kinesis.id
  key          = each.key
  source       = "${path.module}/LougeBeer/${each.key}"
  cache_control = trimprefix(".js", "${path.module}/LougeBeer/${each.key}") == ".js" || trimprefix(".css", "${path.module}/LougeBeer/${each.key}") == ".css" ? "max-age=31536000, public" : null
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag         = filemd5("${path.module}/LougeBeer/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
}
#######################################################################################################
output "s3url" {
  value = "${aws_s3_bucket.s3_bucket_web_kinesis.bucket}.s3website${var.AWS_REGION}.amazonaws.com"
}
output "s3arn" {
  value = aws_s3_bucket.s3_bucket_web_kinesis.arn
}
output "bucket_domain_name" {
  value = aws_s3_bucket.s3_bucket_web_kinesis.bucket_domain_name
}
#################################################################################################
