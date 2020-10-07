
#------------------------------------------------------------------------
#create the instance on public subnet
#-------------------------------------------------------------------------
resource "aws_instance" "instance" {
  ami           = data.aws_ami.ubuntu.id
  #ami          = data.aws_ami.amazon_linux.id
  #ami          = data.aws_ami.redhat.id
  
  instance_type = "t2.micro"

  # The VPC subnet
  #subnet_id = module.vpc.public_subnets[0]
  subnet_id = element(module.vpc.public_subnets, 0)

  # The security group
  vpc_security_group_ids = [ aws_security_group.instance-sg.id ]

  # The public SSH key
  key_name  = aws_key_pair.key-pair.key_name

  #user_data = data.template_cloudinit_config.cloudinit-instance.rendered

  root_block_device {
   # volume_type "standard", "gp2", "io1", "io2", "sc1", or "st1"
   volume_type  = "gp2"
   volume_size  = "10"
   delete_on_termination = true

  }
  
  volume_tags = {
    Name = "${local.default_name}-ec2_extra_volume"
  }
  #name the instance
  tags = {
   Name = "${local.default_name}-ec2_extra_volume"
  }
}
#--------------------------------------------------------------------------
#provide the ip address of the intance 
#------------------------------------------------------------------------------
output "instance-ipaddress" {
  value = aws_instance.instance.public_ip
}
#------------------------------------------------------------------------------
output "public_dns" {
  description = "The public DNS name assigned to the instance. For EC2-VPC, this is only available if you've enabled DNS hostnames for your VPC"
  value = aws_instance.instance.public_dns
}

#------------------------------------------------------------------------------
#create ebs volumen for the intance
#----------------------------------------------------------------------------
resource "aws_ebs_volume" "ebs-volume-1" {
  #availability_zone = "eu-west-1a"
  availability_zone = element(data.aws_availability_zones.azs.names, 0)
  size = 20
  type = "gp2" 

  tags = {
    Name = "${local.default_name}-extra volume data"
  }
}
#-----------------------------------------------------------------------------
# attach the new ebs volume to the instance
#----------------------------------------------------------------------------
resource "aws_volume_attachment" "ebs-volume-1-attachment" {
  device_name = var.INSTANCE_DEVICE_NAME
  volume_id = aws_ebs_volume.ebs-volume-1.id
  instance_id = aws_instance.instance.id
  force_detach = true
}
#----------------------------------------------------------------------------
