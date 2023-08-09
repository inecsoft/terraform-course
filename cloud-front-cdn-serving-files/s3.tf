#terraform import aws_s3_bucket.s3_bucket_cdn calabs-s3cf-ivan
resource "aws_s3_bucket" "s3_bucket_cdn" {
  bucket = "calabs-s3cf-ivan"
  force_destroy = true

}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_ownership_controls" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "s3_bucket_public_access_block" {
  bucket = aws_s3_bucket.s3_bucket_cdn.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "s3_bucket_cdn_acl" {
  depends_on = [
    aws_s3_bucket.s3_bucket_cdn,
    aws_s3_bucket_public_access_block.s3_bucket_public_access_block
  ]

	bucket = aws_s3_bucket.s3_bucket_cdn.id
	acl    = "private" # or can be "public-read"
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

resource "aws_s3_bucket_policy" "s3_bucket_cdn_acl_policy" {
	depends_on = [ aws_s3_bucket.s3_bucket_cdn ]
	bucket = aws_s3_bucket.s3_bucket_cdn.id
  #policy = data.aws_iam_policy_document.iam_policy_document_s3.json
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "${aws_s3_bucket.s3_bucket_cdn.arn}/*"
    }
  ]
}
POLICY

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
  for_each = fileset("${path.module}/src/", "**/*.*")

  bucket       = aws_s3_bucket.s3_bucket_cdn.id
  key          = each.key
  source       = "${path.module}/src/${each.key}"
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag         = filemd5("${path.module}/src/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
}