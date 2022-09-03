resource "aws_s3_bucket" "s3_bucket" {
  bucket = var.bucket

  tags = {
    Name        = var.tag
  }
}

resource "aws_s3_bucket_acl" "s3_bucket_acl" {
  bucket = aws_s3_bucket.s3_bucket.id
  acl    = var.acl
}

resource "aws_s3_bucket_policy" "s3_policy" {
  bucket = aws_s3_bucket.s3_bucket.id
  policy = data.aws_iam_policy_document.s3_policy_doc.json
}

data "aws_iam_policy_document" "s3_policy_doc" {
  statement {
    #sid       = "PublicReadGetObject"
    effect    = "Allow"
    resources = ["${aws_s3_bucket.s3_bucket.arn}/*"]
    actions   = ["s3:GetObject"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_website_configuration" "s3_bucket_website_configuration" {
  bucket = aws_s3_bucket.s3_bucket.id

  redirect_all_requests_to {
    host_name  = var.host_name
    protocol   = var.protocol

  }

}