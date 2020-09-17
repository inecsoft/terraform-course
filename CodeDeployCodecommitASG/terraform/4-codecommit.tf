#---------------------------------------------------------------------
resource "aws_codecommit_repository" "codecommit-repo" {
  repository_name = "${local.default_name}-repo"
  description     = "This is the Sample App Repository"
  
  tags = {
    "Name" = "${local.default_name}"
   }
}
#-----------------------------------------------------------------------------
output "url-http"{
  value = "${aws_codecommit_repository.codecommit-repo.clone_url_http}"
}
#-----------------------------------------------------------------------------
output "url-ssh"{
  value = "${aws_codecommit_repository.codecommit-repo.clone_url_ssh}"
}
#-----------------------------------------------------------------------------
