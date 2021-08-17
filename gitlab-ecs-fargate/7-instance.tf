
#------------------------------------------------------------------------
#create the instance on public subnet
#-------------------------------------------------------------------------
resource "aws_instance" "gitlab" {
  ami = data.aws_ami.ubuntu.id
  #ami          = data.aws_ami.amazon_linux.id
  #ami          = data.aws_ami.redhat.id

  instance_type = "t2.micro"

  # The VPC subnet
  subnet_id = module.vpc.public_subnets[0]
  #subnet_id = slice(module.vpc.public_subnets, 0, 1)

  # The security group
  vpc_security_group_ids = [aws_security_group.gitlab-sg.id]

  # The public SSH key
  key_name = aws_key_pair.key-pair.key_name

  user_data = data.template_cloudinit_config.cloudinit-gitlab.rendered

  root_block_device {
    volume_size           = "10"
    volume_type           = "gp2"
    delete_on_termination = true

  }

  #name the instance
  tags = {
    Name = "${local.default_name}-ec2_extra_volume"
  }
}
#--------------------------------------------------------------------------
#provide the ip address of the intance 
#------------------------------------------------------------------------------
output "gitlab-ipaddress" {
  value = aws_instance.gitlab.public_ip
}
#------------------------------------------------------------------------------
#create ebs volumen for the intance
#----------------------------------------------------------------------------
resource "aws_ebs_volume" "ebs-volume-1" {
  availability_zone = "eu-west-1a"
  size              = 20
  type              = "gp2"

  tags = {
    Name = "${local.default_name}-extra volume data"
  }
}
#-----------------------------------------------------------------------------
# attach the new ebs volume to the instance
#----------------------------------------------------------------------------
resource "aws_volume_attachment" "ebs-volume-1-attachment" {
  device_name  = var.INSTANCE_DEVICE_NAME
  volume_id    = aws_ebs_volume.ebs-volume-1.id
  instance_id  = aws_instance.gitlab.id
  force_detach = true
}

#----------------------------------------------------------------------------
