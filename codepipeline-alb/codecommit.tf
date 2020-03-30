#------------------------------------------------------------------------------------
resource "aws_codecommit_repository" "codepipeline" {
  repository_name = "codepipeline"
  description     = "This is the codepipeline repository"

  tags = {
     Name = "codepipeline"
   }
}
#---------------------------------------------------------------------------------
output "url-http"{
  value = "${aws_codecommit_repository.codepipeline.clone_url_http}"
}
#-----------------------------------------------------------------------------
output "url-ssh"{
  value = "${aws_codecommit_repository.codepipeline.clone_url_ssh}"
}
#-----------------------------------------------------------------------------
