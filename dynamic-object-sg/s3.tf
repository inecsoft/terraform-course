#-----------------------------------------------------------------
resource "aws_s3_bucket" "s3-bucket-dumy-project" {
  bucket = "s3-bucket-dumy-project"
  acl    = "private"

  #force destroy for not prouction env
  force_destroy = true

  tags = {
    Name = "s3-content-bucket"
  }
}
#-----------------------------------------------------------------------
output "bucket-name" {
  value = aws_s3_bucket.s3-bucket-dumy-project.id
}
#-----------------------------------------------------------------------