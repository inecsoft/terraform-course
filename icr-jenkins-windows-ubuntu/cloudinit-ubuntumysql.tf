data "template_file" "ubuntu-mysql-init" {
  template = file("scripts/ubuntu-mysql-init.sh")
  #vars = {
  #  public_address = "${aws_instance.ubuntu-mysql.public_ip}"
  #  private_address = "${aws_instance.ubuntu-mysql.pravite_ip}"
  # }
}


data "template_cloudinit_config" "cloudinit-ubuntu-mysql" {
  gzip          = false
  base64_encode = false

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.ubuntu-mysql-init.rendered
  }

  part {
    content_type = "text/x-shellscript"
    content      = data.template_file.project_vpc_efsscript.rendered
  }
}
