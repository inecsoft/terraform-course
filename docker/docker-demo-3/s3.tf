resource "aws_s3_bucket" "terraform-state-jenkins" {
  bucket = "terraform-state-jenkins"
  acl    = "private"

  tags = {
    Name = "Terraform state jenkins"
  }
}

