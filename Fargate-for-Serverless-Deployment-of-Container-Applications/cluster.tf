resource "aws_ecr_repository" "ecr_repository_fargate" {
  name                 = "ca-container-registry"
  image_tag_mutability = "MUTABLE"

  encryption_configuration {
    encryption_type = "AES256"
  }

  image_scanning_configuration {
    scan_on_push = false
  }
}
# % terraform import aws_ecr_repository.ecr_repository_fargate ca-container-registry

resource "aws_ecs_cluster" "ecs_cluster_fargate" {
  name = var.ecs_cluster
}

