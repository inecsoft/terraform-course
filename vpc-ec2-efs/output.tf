#-------------------------------------------------------
output "ipaddress" {
  value = aws_instance.instance.public_ip
}
#--------------------------------------------------------
output "efs-id" {
  value = aws_efs_file_system.efs.id
}
#--------------------------------------------------------
