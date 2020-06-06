#------------------------------------------------------------------------------------------------------------------
resource  "aws_instance" "bastion" {
   ami                          = data.aws_ami.amazon_linux.id
   instance_type                = "t3.micro"
   key_name                     = aws_key_pair.key.key_name
   associate_public_ip_address  = true
  # user_data                    = data.template_cloudinit_config.cloudinit-bastion.rendered

   security_groups              = ["${aws_security_group.sg-bastion.id}"]

   # the VPC subnet
   subnet_id                    = element(module.vpc.public_subnets,0)

   root_block_device {
     volume_type = "gp2"
     volume_size = "10"
     encrypted   =  true
     #iops       = ""
     #kms_key_arn = "${aws_kms_key.kms-db.arn}"
     delete_on_termination = true

   }

  provisioner "file" {
  source      = "project"
  destination = "/home/${var.redhat-user}/.ssh/project"
    connection {
    host = self.public_ip
    user = var.redhat-user
    private_key = file("${var.PATH_TO_PRIVATE_KEY}")
   }
  }

  provisioner "remote-exec" {
    inline = ["sudo chmod 400 /home/${var.redhat-user}/.ssh/project"]
    connection {
      host = self.public_ip
      user = var.redhat-user
      private_key = file("${var.PATH_TO_PRIVATE_KEY}")
   }
  }

  volume_tags = {
          Name      = "${local.default_name}-ebs_bastion_volume"
  }
 

  tags = {
     Name = "${local.default_name}-Bastion-host"
  }

}
#----------------------------------------------------------------------------------
output "Bation-IPAddress" {
  value = aws_instance.bastion.public_ip
}
#----------------------------------------------------------------------------------
#resource "null_resource" "ansible-main" {
#  provisioner "local-exec" {
#    command = "ansible-playbook -e sshKey=${var.PATH_TO_PRIVATE_KEY} -i '${aws_instance.bastion.public_ip},' ./ansible/setup-bastion.yaml -v"
# }

# depends_on = ["aws_instance.bastion"]
#}
#----------------------------------------------------------------------------------
#ANSIBLE_HOST_KEY_CHECKING=false