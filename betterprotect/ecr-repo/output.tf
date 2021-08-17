#----------------------------------------------------------------
output "myapp-repository-URL" {
  value = aws_ecr_repository.betterproject-repo.repository_url
}
#----------------------------------------------------------------
