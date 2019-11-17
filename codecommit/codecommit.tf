resource "aws_codecommit_repository" "app-node-prod" {
  repository_name = "app-node-prod"
  description     = "This is the Sample App Repository"
  tags = {
     Name = "app-node-prod"
   }
}
