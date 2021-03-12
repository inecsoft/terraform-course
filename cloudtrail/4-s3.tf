#-----------------------------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-cloudtrail" {
  bucket = "${local.default_name}-s3-bucket-cloudtrail"
  acl    = "private"

  force_destroy = true

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AWSCloudTrailAclCheck",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "s3:GetBucketAcl",
      "Resource": "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail"
    },
    {
      "Sid": "AWSCloudTrailWrite",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudtrail.amazonaws.com"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::${local.default_name}-s3-bucket-cloudtrail/prefix/AWSLogs/${data.aws_caller_identity.current.account_id}/*",
      "Condition": {
          "StringEquals": {
              "s3:x-amz-acl": "bucket-owner-full-control"
          }
      }
    }
  ]
}
POLICY

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.kms-key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }

  tags = {
    Environment = var.environment
    Project     = var.project
    Name        = "${local.default_name}-s3-bucket-cloudtrail"
  }
}
#-----------------------------------------------------------------------------------------------------------------------------