#------------------------------------------------------------------------------------
resource "aws_codecommit_repository" "codepipeline" {
  repository_name = "codepipeline"
  description     = "This is the codepipeline repository"
}
#---------------------------------------------------------------------------------