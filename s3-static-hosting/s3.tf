#----------------------------------------------------------------------------------------
data "template_file" "s3_public_policy" {
  template = file("policies/s3-public.json")
  vars = {
    bucket_name = var.bucket_name
  }
}
#----------------------------------------------------------------------------------------
resource "aws_s3_bucket" "static_site" {
  bucket = var.bucket_name
  acl = "public-read"
  policy = data.template_file.s3_public_policy.rendered

  website {
    index_document = "index.html"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_s3_bucket_object" "index" {
  bucket = aws_s3_bucket.static_site.bucket
  key = "index.html"
  source = "src/index.html"
  content_type = "text/html"
  # The filemd5() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the md5() function and the file() function:
  # etag = md5(file("path/to/file"))
  etag = md5(file("src/index.html"))
}
#----------------------------------------------------------------------------------------
output "s3-url" {
  value = "${aws_s3_bucket.static_site.bucket}.s3-website-${var.region}.amazonaws.com"
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

