#----------------------------------------------------------------------------------------
resource "aws_s3_bucket_policy" "s3-bucket-policy" {
  bucket = aws_s3_bucket.static_site.id

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "${aws_s3_bucket.static_site.arn}/*"
      ]
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------------------
resource "aws_s3_bucket" "static_site" {
  bucket = var.bucket_name
  acl = "public-read"
  force_destroy = true
  
  website {
    index_document = "default.html"
  }
  tags = {
   Env = terraform.workspace
  }
}
#----------------------------------------------------------------------------------------
resource "aws_s3_bucket_object" "index" {
  bucket = aws_s3_bucket.static_site.bucket
  server_side_encryption = "AES256"
  key = "default.html"
  source = "src/default.html"
  content_type = "text/html"
  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = md5(file("path/to/file"))
  etag = md5(file("src/default.html"))
}
#----------------------------------------------------------------------------------------
output "s3-url" {
  value = "${aws_s3_bucket.static_site.bucket}.s3-website-${var.region}.amazonaws.com"
}
output "s3-website_endpoint" {
  value = aws_s3_bucket.static_site.website_endpoint
}
output "s3-arn" {
  value = aws_s3_bucket.static_site.arn
}
output "s3-websit_domain" {
  value = aws_s3_bucket.static_site.website_domain
}
output "bucket_domain_name" {
  value = aws_s3_bucket.static_site.bucket_domain_name
}
#----------------------------------------------------------------------------------------

