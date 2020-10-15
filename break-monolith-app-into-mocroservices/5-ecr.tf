#-------------------------------------------------------------------
resource "aws_ecr_repository" "foo" {
  name                 =  "${local.default_name}-ecr"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
  

  encryption_type = "KMS"
  kms_key = 

  
  tags = {
    Name = "${local.default_name}-ecr"
  }
}
#-------------------------------------------------------------------