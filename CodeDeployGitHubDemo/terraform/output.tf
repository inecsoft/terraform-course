#-------------------------------------------------------
output "ipaddress" {
    value = "${aws_instance.instance.public_ip}"
}
#--------------------------------------------------------
output "efs-id" {
    value = "${aws_efs_file_system.efs.id}"
}
#-----------------------------------------------------------------------------
output "url-http"{
  value = "${aws_codecommit_repository.app-node-prod.clone_url_http}"
}
#-----------------------------------------------------------------------------
output "url-ssh"{
  value = "${aws_codecommit_repository.app-node-prod.clone_url_ssh}"
}
#-----------------------------------------------------------------------------
