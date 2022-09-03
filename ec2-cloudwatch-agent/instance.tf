#-----------------------------------------------------------------------------------------------
#create a template to store the set of instruction to install on the instance to access the RDS
#-----------------------------------------------------------------------------------------------
data "template_file" "userdata" {
  template = file("./file/userdata.tpl")
}
#----------------------------------------------------------------------------
#create an instance to access the RDS
#----------------------------------------------------------------------------
resource "aws_instance" "ec2" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"

  # the VPC subnet
  subnet_id = element(module.vpc.public_subnets,0)

  iam_instance_profile = aws_iam_instance_profile.CloudWatchAgent-ssmServerRoleProfile.name

  # the security group
  vpc_security_group_ids = [aws_security_group.mgmt-instance.id]

  # the public SSH key
  key_name = aws_key_pair.keypair.key_name


  associate_public_ip_address = true
  root_block_device {
    volume_type           = "gp2"
    volume_size           = "30"
    delete_on_termination = true

  }
  # Copies the myapp.conf file to /etc/myapp.conf
    provisioner "file" {
     source      = "cloudwatch_agent.json"
     destination = "/tmp/cloudwatch_agent.json"
    }
    /* provisioner "remote-exec" {
      inline = [
        "chmod +x /tmp/cloudwatch_agent.json",
        "/tmp/cloudwatch_agent.json"
      ]
    } */
  # use userdata to install mysql-client on the instance to access the RDS server
  user_data = data.template_file.userdata.rendered

  connection {
    host        = self.public_ip
    user        = var.INSTANCE_USERNAME
    private_key = file("${var.PATH_TO_PRIVATE_KEY}")
  }

  tags = {
    Name = "cloudwatch-agent"
  }

}

#----------------------------------------------------------------------------

output "ec2_ip" {
  value = aws_instance.ec2.public_ip
}