#-------------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-mount" {
  bucket        = "${local.default_name}-s3-bucket-mount"
  force_destroy = true


  tags = {
    Name = "${local.default_name}-s3-bucket-mount"
  }
}

/* resource "aws_s3_bucket_acl"  "s3_bucket_acl" {
  bucket = aws_s3_bucket.s3-bucket-mount.id
  acl           = "private"

} */

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.s3-bucket-mount.id
  rule {
    apply_server_side_encryption_by_default {
      kms_master_key_id = aws_kms_key.kms-key.arn
      sse_algorithm     = "aws:kms"
    }
  }
}
#-------------------------------------------------------------------
output "s3-arn" {
  description = "description"
  value       = aws_s3_bucket.s3-bucket-mount.arn
}
#-------------------------------------------------------------------