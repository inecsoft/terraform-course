#---------------------------------------------------------------------
resource "aws_codecommit_repository" "codecommit-repo" {
  repository_name = "${local.default_name}-repo"
  description     = "This is the Sample App Repository"
  default_branch  = "master"

  tags = {
    "Name" = "${local.default_name}-repo"
  }
}
#-----------------------------------------------------------------------------
output "repo-url-http"{
  value = aws_codecommit_repository.codecommit-repo.clone_url_http
}
#-----------------------------------------------------------------------------
output "repo-url-ssh"{
  value = aws_codecommit_repository.codecommit-repo.clone_url_ssh
}
#-----------------------------------------------------------------------------
output "repo-repository_id"{
  value = aws_codecommit_repository.codecommit-repo.repository_id 
}
#-----------------------------------------------------------------------------