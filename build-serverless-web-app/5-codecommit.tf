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
# resource "null_resource" "project-mgmt-apply" {

#   provisioner "local-exec" {
#     when    = create
#     command = "cd code; git add .; git commit -am '`date`'; git push"
#     on_failure = continue
#   }
# }
# #-----------------------------------------------------------------------------
# resource "null_resource" "project-mgmt-destroy" {

#   provisioner "local-exec" {
#     when    = destroy
#     command = "echo 'Destroy-time provisioner'"
#     on_failure = continue
#   }
# }
#-----------------------------------------------------------------------------
output "repo-url-http" {
  value = aws_codecommit_repository.codecommit-repo.clone_url_http
}
#-----------------------------------------------------------------------------
output "repo-url-ssh" {
  value = aws_codecommit_repository.codecommit-repo.clone_url_ssh
}
#-----------------------------------------------------------------------------
output "repo-repository_id" {
  value = aws_codecommit_repository.codecommit-repo.repository_id
}
#-----------------------------------------------------------------------------