resource "aws_s3_bucket" "aritifact_bucket" {
  bucket        = "dev-lambda-s3-lab"
  force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "aritifact_bucket_ownership_controls" {
  bucket = aws_s3_bucket.aritifact_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_versioning" "aritifact_bucket_versioning" {
  bucket = aws_s3_bucket.aritifact_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "aritifact_bucket_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.aritifact_bucket.id
  depends_on = [
    aws_s3_bucket.aritifact_bucket,
  ]

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_object" "s3-lambda-content-bucket-object" {
  key    = "${local.app_version}/lambda-py.zip"
  bucket = aws_s3_bucket.aritifact_bucket.id
  #content    = "web/index.html"
  #source = "web/index.html"
  source       = data.archive_file.zip.output_path
  content_type = "application/zip"


  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key
  #server_side_encryption = "aws:kms"
  #metadata = var.metadata

  tags = {
    Name = "s3-content-bucket-object"
  }

}


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
}

resource "aws_s3_object" "content" {
  for_each = fileset("${path.module}/build/", "**#/*.*")

  bucket       = aws_s3_bucket.aritifact_bucket.id
  key          = each.key
  source       = "${path.module}/build/${each.key}"
  content_type = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag         = filemd5("${path.module}/build/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
} */

output "bucket_name" {
  value = aws_s3_bucket.aritifact_bucket.id
}