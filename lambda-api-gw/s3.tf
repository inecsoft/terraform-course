#-----------------------------------------------------------------
resource "aws_s3_bucket" "inecsoft-serverless" {
  bucket = "inecsoft-serverless"
  acl    = "private"
}
#-----------------------------------------------------------------------
output "bucket-name" {

  value = aws_s3_bucket.inecsoft-serverless.id
}
#-----------------------------------------------------------------------

