#-------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-dynamodb-backup" {
  bucket = "${local.default_name}-s3-bucket-dynamodb-backup"
  acl    = "private"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        kms_master_key_id = aws_kms_key.kms-key.arn
        sse_algorithm     = "aws:kms"
      }
    }
  }

  tags = {
    Name        = "${local.default_name}-s3-bucket-dynamodb-backup"
  }
}
#-------------------------------------------------------------------------------------------
output "s3-bucket-dynamodb-backup-id" {
  description = "s3-bucket-dynamodb-backup-id"
  value       = aws_s3_bucket.s3-bucket-dynamodb-backup.id
}
#-------------------------------------------------------------------------------------------

