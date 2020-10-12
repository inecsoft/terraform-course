data "template_file" "bastion-init" {
  template = file("scripts/bastion-init.sh")
  #vars = {
  #  public_address = "${aws_instance.ubuntu-mysql.public_ip}"
  #  private_address = "${aws_instance.ubuntu-mysql.pravite_ip}"
  # }
}

data "template_file" "bastion-users" {
  template = file("scripts/users.cfg")
    vars = {
    REGION = var.AWS_REGION
  }

}

data "template_cloudinit_config" "cloudinit-bastion" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/cloud-config"
    content      = "hostname: ${local.default_name}-bastion \nmanage_etc_hosts: true"
  }


  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.bastion-init.rendered
  }

  #part {
  #  content_type = "text/cloud-config"
  #  content      = data.template_file.bastion-users.rendered
  #}

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.suluq_vpc_efsscript.rendered
  }
}
