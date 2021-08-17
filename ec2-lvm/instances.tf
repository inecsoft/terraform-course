#-------------------------------------------------------------------------
data "template_file" "userdata" {
  template = file("scripts/userdata.tpl")
  vars = {
    DEVICE     = "${var.INSTANCE_DEVICE_NAME}"
    EXT_DEVICE = "${var.EXT_INSTANCE_DEVICE_NAME}"
  }
}
#-------------------------------------------------------------------------
resource "aws_instance" "webserver" {
  ami           = lookup(var.AMIS, var.AWS_REGION)
  instance_type = "t2.micro"
  key_name      = aws_key_pair.mykey.key_name

  # the VPC subnet
  subnet_id = module.vpc.public_subnets[0]

  # the security group
  vpc_security_group_ids = ["${aws_security_group.allow-ssh.id}"]

  associate_public_ip_address = true

  root_block_device {
    volume_type           = "gp2"
    volume_size           = "8"
    delete_on_termination = true
  }

  ebs_block_device {
    device_name           = var.INSTANCE_DEVICE_NAME
    delete_on_termination = true
    volume_size           = 10
    volume_type           = "gp2"
    encrypted             = true
  }

  ebs_block_device {
    device_name           = var.EXT_INSTANCE_DEVICE_NAME
    delete_on_termination = true
    volume_size           = 10
    volume_type           = "gp2"
    encrypted             = true
  }

  # user data
  user_data = data.template_file.userdata.rendered

  tags = {
    Name = "webserver"
  }

  connection {
    host        = self.public_ip
    user        = var.INSTANCE_USERNAME
    timeout     = "1m"
    private_key = file("${var.PATH_TO_PRIVATE_KEY}")
  }
}

#-------------------------------------------------------------------------

