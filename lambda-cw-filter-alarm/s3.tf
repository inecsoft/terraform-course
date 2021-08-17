#-----------------------------------------------------------------
resource "aws_s3_bucket" "inecsoft-serverless" {
  bucket        = "inecsoft-serverless"
  acl           = "private"
  force_destroy = true
}
#-----------------------------------------------------------------------
output "bucket-name" {
  value = aws_s3_bucket.inecsoft-serverless.id
}
#-----------------------------------------------------------------------

