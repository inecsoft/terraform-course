
#--------------------------------------------------------------------------------
# terraform import aws_s3_bucket.s3-web-content-bucket bucket-name
#---------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-web-content-bucket" {
  bucket = "${local.default_name}-s3-content-bucket"
  #acl    = "private"
  #static web hosting
  #acl    = "public-read"

  force_destroy = true

  versioning {
    enabled    = false
    mfa_delete = false
  }

  website {
    index_document = "index.html"
  }
  #Provisioning did not upload the file.
  # provisioner "local-exec" {
  #   command = "aws s3 cp web/index.html s3://${aws_s3_bucket.s3-web-content-bucket.id}/index.html "
  # }

  # server_side_encryption_configuration {
  #   rule {
  #     apply_server_side_encryption_by_default {
  #       kms_master_key_id = aws_kms_key.key.arn
  #       sse_algorithm     = "aws:kms"
  #     }
  #   }
  # }

  tags = {
    Name = "${local.default_name}-s3-content-bucket"
  }
}

#terraform import aws_s3_bucket_policy.s3-web-content-bucket-policy my-bucket-name
resource "aws_s3_bucket_policy" "s3-web-content-bucket-policy" {
  bucket = aws_s3_bucket.s3-web-content-bucket.id

  policy = <<POLICY
{
    "Id": "MyPolicy",
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "PublicReadForGetBucketObjects",
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:GetObject",
        "Resource": "${aws_s3_bucket.s3-web-content-bucket.arn}/*"
      }
    ]
}
POLICY
}
variable "metadata" {
  type = map(any)
  default = {
    content-type = "text/html"
  }
}

#--------------------------------------------------------------------------------
#this has an issue with the metadata. the issue can be solved by
#aws s3 cp web/index.html s3://$REPLACE_ME_BUCKET_NAME/index.html
#--------------------------------------------------------------------------------
resource "aws_s3_bucket_object" "s3-web-content-bucket-object" {
  key    = "index.html"
  bucket = aws_s3_bucket.s3-web-content-bucket.id
  #content    = "web/index.html"
  source       = "web/index.html"
  content_type = "text/html"


  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-content-bucket-object"
  }

}
#--------------------------------------------------------------------------------
output "bucket_domain_name" {
  value       = aws_s3_bucket.s3-web-content-bucket.bucket_domain_name
  description = "provides the url of the s3 web hosting"
}
#--------------------------------------------------------------------------------
output "bucket_regional_domain_name" {
  value       = aws_s3_bucket.s3-web-content-bucket.bucket_regional_domain_name
  description = "The bucket region-specific domain name"
}
#--------------------------------------------------------------------------------
output "website_endpoint" {
  value       = aws_s3_bucket.s3-web-content-bucket.website_endpoint
  description = "The website endpoint, if the bucket is configured with a website. If not, this will be an empty string."
}
#--------------------------------------------------------------------------------
