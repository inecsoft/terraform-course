#----------------------------------------------------------------------------------
#resource "null_resource" "ansible-main" {
#  provisioner "local-exec" {
#    command = "ansible-playbook -e sshKey=${var.PATH_TO_PRIVATE_KEY} -i '${aws_instance.bastion.public_ip},' ./ansible/setup-bastion.yaml -v"
# }

# depends_on = ["aws_instance.bastion"]

#----------------------------------------------------------------------------------
resource "azurerm_resource_group" "image" {
  name     = "${local.default_name}-ResourceGroup"
  location = var.location
  
  provisioner "local-exec" {
    command = "image build ubuntu.json"
  }

  tags = {
     environment = "codelab"
  }
}
#----------------------------------------------------------------------------------
