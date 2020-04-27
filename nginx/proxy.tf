resource  "aws_instance" "proxy" {
   #ami                          = "${data.aws_ami.amazon_linux.id}"
   ami                          = data.aws_ami.redhat.id
   instance_type                = "t3.micro"
   key_name                     = "${aws_key_pair.proxy.key_name}"
   associate_public_ip_address  = true
   user_data                    = data.template_cloudinit_config.cloudinit-proxy.rendered

   security_groups              = ["${aws_security_group.proxy.id}"]

   # the VPC subnet
   subnet_id                    = element(module.vpc.public_subnets,0)

   root_block_device {
     volume_type = "gp2"
     volume_size = "30"
     encrypted   =  true
     #iops       = ""
     #kms_key_arn = "${aws_kms_key.suluq-kms-db.arn}"
     delete_on_termination = true

   }


  provisioner "file" {
  source      = "proxy"
  destination = "/home/${var.redhat-user}/.ssh/proxy"
    connection {
    host = "${self.public_ip}"
    user = "${var.redhat-user}"
    private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
   }
  }

 provisioner "file" {
  source      = "scripts/jail.local"
  destination = "/etc/fail2ban/"
    connection {
    host = "${self.public_ip}"
    user = "${var.redhat-user}"
    private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
   }
  }
  provisioner "remote-exec" {
    inline = ["sudo chmod 400 /home/${var.redhat-user}/.ssh/proxy"]
    connection {
      host = "${self.public_ip}"
      user = "${var.redhat-user}"
      private_key = "${file("${var.PATH_TO_PRIVATE_KEY}")}"
   }
  }

  volume_tags = {
    Name      = "ebs_proxy_volume"
  }
 

  tags = {
     Name = "${local.default_name}-proxy-host"
  }

}
#----------------------------------------------------------------------------------
output "proxy-IPAddress" {
  value = "${aws_instance.proxy.public_ip}"
}
#----------------------------------------------------------------------------------
#resource "null_resource" "ansible-main" {
#  provisioner "local-exec" {
#    command = "ansible-playbook -e sshKey=${var.PATH_TO_PRIVATE_KEY} -i '${aws_instance.proxy.public_ip},' ./ansible/setup-proxy.yaml -v"
# }

# depends_on = ["aws_instance.proxy"]
#}
#----------------------------------------------------------------------------------
#ANSIBLE_HOST_KEY_CHECKING=false
#-----------------------------------------------------------------------------------------------------

data "template_file" "proxy-init" {
  template = file("scripts/proxy-init.tpl")
  }

}

data "template_file" "proxy" {
  template = file("scripts/proxy.sh")
    vars = {
    REGION = var.AWS_REGION
  }

}
data "template_cloudinit_config" "cloudinit-proxy" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/cloud-config"
    content      = data.template_file.proxy-init.rendered
    filename     = "cloud-config"
  }

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.proxy.rendered
  }
}
#-----------------------------------------------------------------------------------------------------

