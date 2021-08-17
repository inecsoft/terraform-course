#-----------------------------------------------------------------
resource "aws_s3_bucket" "s3-ssm-output-history" {
  bucket = "${terraform.workspace}-s3-ssm-output-history"
  acl    = "private"

  force_destroy = true

  tags = {
    Name = "${local.default_name}-s3"
  }
}
#--------------------------------------------------------------------
resource "aws_s3_bucket_policy" "s3-web-content-bucket-policy" {
  bucket = aws_s3_bucket.s3-ssm-output-history.id
  policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "Allow writes from the SSM service",
      "Effect": "Allow",
      "Principal": {
        "Service": "ssm.amazonaws.com"
      },
      "Action": "s3:PutObject",
      "Resource": "${aws_s3_bucket.s3-ssm-output-history.arn}/*"
    },
    {
      "Sid": "Enforce HTTPS Connections",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:*",
      "Resource": "${aws_s3_bucket.s3-ssm-output-history.arn}/*",
      "Condition": {
        "Bool": {
          "aws:SecureTransport": "false"
        }
      }
    },
    {
      "Sid": "Restrict Delete* Actions",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:Delete*",
      "Resource": "${aws_s3_bucket.s3-ssm-output-history.arn}/*"
    },
    {
      "Sid": "Deny Unencrypted Object Uploads",
      "Effect": "Deny",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "${aws_s3_bucket.s3-ssm-output-history.arn}/*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      }
    }
  ]
}
POLICY
}
#-----------------------------------------------------------------------
output "s3-ssm-output-history" {
  value = aws_s3_bucket.s3-ssm-output-history.id
}
#-----------------------------------------------------------------------
