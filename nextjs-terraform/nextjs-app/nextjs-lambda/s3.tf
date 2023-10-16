#S3 Bucket
#This section sets up a private S3 bucket and grants permission to access its contents via CloudFront.

resource "aws_s3_bucket" "cdn_bucket" {
  bucket        = var.CDN_URL
  force_destroy = true

  tags = {
    Name = "Nextjs CDN Bucket"
  }
}

resource "aws_s3_bucket_ownership_controls" "bucket_ownership" {
  bucket = aws_s3_bucket.cdn_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "cdn_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.bucket_ownership]

  bucket = aws_s3_bucket.cdn_bucket.id
  acl    = "private"
}

resource "aws_s3_bucket_policy" "cloudfront_bucket_policy" {
  bucket = aws_s3_bucket.cdn_bucket.id
  policy = data.aws_iam_policy_document.s3_bucket_policy.json

}

data "aws_iam_policy_document" "s3_bucket_policy" {
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
      "${aws_s3_bucket.cdn_bucket.arn}/*",
    ]

    condition {
      test     = "ForAnyValue:StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.s3_distribution.arn]
    }
  }
}

#########################-logging-#############################
resource "aws_s3_bucket" "logging_bucket" {
  bucket = "${var.CDN_URL}-s3-logging"
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

resource "aws_s3_bucket_logging" "s3_bucket_cdn_logging" {
  depends_on = [ aws_s3_bucket.logging_bucket ]
  bucket = aws_s3_bucket.cdn_bucket.id

  target_bucket = aws_s3_bucket.logging_bucket.id
  target_prefix = "s3-access-logs/"
}