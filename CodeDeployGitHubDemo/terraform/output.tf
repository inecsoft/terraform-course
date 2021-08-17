#-------------------------------------------------------
data "aws_instances" "asg-collecttion" {
  instance_tags = {
    CodePipelineDemo = "CodePipelineDemo"
  }
  instance_state_names = ["running", "pending"]
}
output "ipaddress" {
  value = data.aws_instances.asg-collecttion.public_ips
}
#--------------------------------------------------------
output "efs-id" {
  value = aws_efs_file_system.efs.id
}
#-----------------------------------------------------------------------------
output "url-http" {
  value = aws_codecommit_repository.app-node-prod.clone_url_http
}
#-----------------------------------------------------------------------------
output "url-ssh" {
  value = aws_codecommit_repository.app-node-prod.clone_url_ssh
}
#-----------------------------------------------------------------------------
