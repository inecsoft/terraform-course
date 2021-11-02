#------------------------------------------------------------------------
#create the instance on public subnet
#-------------------------------------------------------------------------
resource "aws_instance" "example" {
  ami           = lookup(var.AMIS, var.AWS_REGION)
  instance_type = "t2.micro"

  # the VPC subnet
  subnet_id = aws_subnet.my_vpc_subnet_public[0].id

  # the security group
  vpc_security_group_ids = ["${aws_security_group.my_security_group.id}"]

  # the public SSH key
  key_name = aws_key_pair.mykey.key_name

  root_block_device {
    volume_size           = "10"
    volume_type           = "gp2"
    delete_on_termination = true

  }

  #name the instance
  tags = {
    Name = "ec2_extra_volume"
  }
}
#--------------------------------------------------------------------------
#provide the ip address of the intance 
#------------------------------------------------------------------------------
output "ipaddress" {
  value = aws_instance.example.public_ip
}
#------------------------------------------------------------------------------
#create ebs volumen for the intance
#----------------------------------------------------------------------------
resource "aws_ebs_volume" "ebs-volume-1" {
  availability_zone = "eu-west-1a"
  size              = 20
  type              = "gp2"
  tags = {
    Name = "extra volume data"
  }
}
#-----------------------------------------------------------------------------
# attach the new ebs volume to the instance
#----------------------------------------------------------------------------
resource "aws_volume_attachment" "ebs-volume-1-attachment" {
  device_name  = "/dev/xvdh"
  volume_id    = aws_ebs_volume.ebs-volume-1.id
  instance_id  = aws_instance.example.id
  force_detach = true
}

#----------------------------------------------------------------------------
