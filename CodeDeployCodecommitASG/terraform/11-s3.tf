#-----------------------------------------------------------------------
resource "aws_s3_bucket" "codepipeline-bucket" {
    bucket = "${local.default_name}-codepipeline-bucket"
    acl    = "private"
    force_destroy = true

    lifecycle {

        # Any Terraform plan that includes a destroy of this resource will
        # result in an error message.
        #
        prevent_destroy = false
    }

    tags = {
       Name  = "${local.default_name}-codepipeline-bucket"
    }
}
#-----------------------------------------------------------------------
resource "aws_s3_bucket_policy" "codepipeline-bucket-policy" {
  bucket = aws_s3_bucket.codepipeline-bucket.id

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Id": "SSEAndSSLPolicy",
    "Statement": [
        {
        "Sid": "DenyUnEncryptedObjectUploads",
        "Effect": "Deny",
        "Principal": "*",
        "Action": "s3:PutObject",
        "Resource": "${aws_s3_bucket.codepipeline-bucket.arn}/*",
        "Condition": {
            "StringNotEquals": {
            "s3:x-amz-server-side-encryption": "aws:kms"
            }
        }
        },
        {
        "Sid": "DenyInsecureConnections",
        "Effect": "Deny",
        "Principal": "*",
        "Action": "s3:*",
        "Resource": "${aws_s3_bucket.codepipeline-bucket.arn}/*",
        "Condition": {
            "Bool": {
            "aws:SecureTransport": "false"
            }
        }
        }
    ]
}
POLICY
}
#-----------------------------------------------------------------------
output "bucket-name" {
  description = "backet to store the artifact"
  value       = aws_s3_bucket.codepipeline-bucket.bucket
}
#-----------------------------------------------------------------------