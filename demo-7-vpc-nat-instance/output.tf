#--------------------------------------
output "eip_public" {
  value = "${module.nat.eip_public_ip}"
}

#--------------------------------------
output "eip_private" {
 value =  "${module.nat.eni_private_ip}"
}
#--------------------------------------