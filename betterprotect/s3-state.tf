resource "aws_s3_bucket" "betterproject_bucket-state" {
  bucket = "betterproject_bucket-state"
  acl    = "private"

  tags = {
    Name = "betterproject_bucket"
  }
}