#-------------------------------------------------------------------
resource "aws_ecr_repository" "ecr-repository" {
    name                 = "${local.default_name}-ecr"
    
    image_tag_mutability = "IMMUTABLE"
    

    encryption_configuration {
        encryption_type = "KMS"
        kms_key         = aws_kms_key.kms-key.id
    }

    image_scanning_configuration {
        scan_on_push = true
    }

    timeouts {}
   
    tags = {
       Name = "${local.default_name}-ecr"
    }
}
#-------------------------------------------------------------------
output "ecr-repository-url" {
  description = "ecr-repository-url to access the repo"
  value       = aws_ecr_repository.ecr-repository.repository_url
}
#-------------------------------------------------------------------
