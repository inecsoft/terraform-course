resource "aws_instance" "betterproject-jenkins-instance" {
  ami           = var.AMIS[var.AWS_REGION]
  instance_type = "t2.micro"

  # the VPC subnet
  subnet_id = aws_subnet.betterproject_vpc-public-1.id

  # the security group
  vpc_security_group_ids = [aws_security_group.betterproject-jenkins-securitygroup.id]

  # the public SSH key
  key_name = aws_key_pair.betterproject.key_name

  # user data
  #user_data = data.template_cloudinit_config.cloudinit-jenkins.rendered
}

resource "aws_ebs_volume" "betterproject-jenkins-data" {
  availability_zone = "eu-west-1a"
  size              = 100
  type              = "gp2"

  tags = {
    Name = "betterproject-jenkins-data"
  }
}

resource "aws_volume_attachment" "betterproject-jenkins-data-attachment" {
  device_name = var.INSTANCE_DEVICE_NAME
  volume_id   = aws_ebs_volume.betterproject-jenkins-data.id
  instance_id = aws_instance.betterproject-jenkins-instance.id
}
