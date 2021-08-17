#-------------------------------------------------------------------
resource "aws_ecr_repository" "ecr-repository" {
  name = "${local.default_name}-ecr"

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
resource "aws_ecr_lifecycle_policy" "ec-lifecycle-policy" {
  repository = aws_ecr_repository.ecr-repository.name

  policy = <<EOF
{
    "rules": [
        {
            "rulePriority": 1,
            "description": "Policy on untagged image expires images older than 15 days",
            "selection": {
                "tagStatus": "untagged",
                "countType": "sinceImagePushed",
                "countUnit": "days",
                "countNumber": 15
            },
            "action": {
                "type": "expire"
            }
        },
        {
            "rulePriority": 2,
            "description": "Policy on tagged image keep last 10 images",
            "selection": {
                "tagStatus": "tagged",
                "tagPrefixList": ["v"],
                "countType": "imageCountMoreThan",
                "countNumber": 10
            },
            "action": {
                "type": "expire"
            }
        }
    ]
}
EOF
}
#-------------------------------------------------------------------