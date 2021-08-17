#-----------------------------------------------------------------------------------------------
#create a template to store the set of instruction to install on the instance to access the RDS
#-----------------------------------------------------------------------------------------------
data "template_file" "userdata" {
  template = file("userdata.tpl")
}
#----------------------------------------------------------------------------
#create an instance to access the RDS
#----------------------------------------------------------------------------
resource "aws_instance" "example" {
  ami           = var.AMIS[var.AWS_REGION]
  instance_type = "t2.micro"

  # the VPC subnet
  subnet_id = aws_subnet.main-public-1.id

  # the security group
  vpc_security_group_ids = [aws_security_group.mgmt-instance.id]

  # the public SSH key
  key_name = aws_key_pair.mykeypair.key_name


  associate_public_ip_address = true
  root_block_device {
    volume_type           = "gp2"
    volume_size           = "8"
    delete_on_termination = true

  }
  # Copies the myapp.conf file to /etc/myapp.conf
  #  provisioner "file" {
  #    source      = "cloudwatch_agent.json"
  #    destination = "/tmp/cloudwatch_agent.json"
  #  }
  #    provisioner "remote-exec" {
  #    inline = [
  #      "chmod +x /tmp/cloudwatch_agent.json",
  #      "/tmp/cloudwatch_agent.json"
  #    ]
  #  }
  # use userdata to install mysql-client on the instance to access the RDS server
  user_data = data.template_file.userdata.rendered

  connection {
    host        = self.public_ip
    user        = var.INSTANCE_USERNAME
    private_key = file("${var.PATH_TO_PRIVATE_KEY}")
  }

  tags = {
    Name = "rds-management"

  }

}

#----------------------------------------------------------------------------

