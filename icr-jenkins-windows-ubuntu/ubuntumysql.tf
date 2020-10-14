################
# EC2 instances
################
resource "aws_instance" "ubuntu-mysql" {
  ami           = "${lookup(var.AMIS-UBUNTU, var.AWS_REGION)}"

  #t3.medium rquested
  instance_type = "t3.medium"

  # the VPC subnet
  subnet_id = element(module.vpc.public_subnets,0)

  # the security groupcd
  security_groups = [aws_security_group.project_vpc-ubuntu-mysql-sg.id]

  # the public SSH key
  key_name = aws_key_pair.project.key_name

  # user data
  user_data = data.template_cloudinit_config.cloudinit-ubuntu-mysql.rendered


  root_block_device     {
      volume_size = "30"
      volume_type = "gp2"
      delete_on_termination = true
    }

  tags = {

      Name = "project-ubuntu-mysql"
  }
}
#-----------------------------------------------------------------------

output "ubuntu-mysql-ipaddress" {
  value = "${aws_instance.ubuntu-mysql.private_ip}"
  
}