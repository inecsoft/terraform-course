resource "aws_s3_bucket" "s3_bucket_ecs_fargate" {
  bucket        = "bucketecsfargate"
  force_destroy = true
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration_ecs_fargate" {
  bucket = aws_s3_bucket.s3_bucket_ecs_fargate.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

locals {
  mime_types = {
    "css"      = "text/css"
    "html"     = "text/html"
    "ico"      = "image/vnd.microsoft.icon"
    "js"       = "application/javascript"
    "json"     = "application/json"
    "map"      = "application/json"
    "png"      = "image/png"
    "svg"      = "image/svg+xml"
    "txt"      = "text/plain"
    "jpeg"     = "image/jpeg"
    "DS_Store" = "text/plain"
    "gif"      = "image/gif"
    "zip"      = "application/x-zip-compressed"
  }
}

resource "aws_s3_object" "s3_bucket_web_kinesis_content" {
  for_each = fileset("${path.module}/fargate-lab/", "**/*.*")

  bucket                 = aws_s3_bucket.s3_bucket_ecs_fargate.id
  key                    = "/fargate-lab/${each.key}"
  source                 = "${path.module}/fargate-lab/${each.key}"
  cache_control          = trimprefix(".js", "${path.module}/fargate-lab/${each.key}") == ".js" || trimprefix(".css", "${path.module}/fargate-lab/${each.key}") == ".css" ? "max-age=31536000, public" : null
  content_type           = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
  etag                   = filemd5("${path.module}/fargate-lab/${each.key}")
  server_side_encryption = "AES256"
  storage_class          = "STANDARD"
}