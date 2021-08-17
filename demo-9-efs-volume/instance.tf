#------------------------------------------------------------------------
#create the instance on public subnet
#-------------------------------------------------------------------------
resource "aws_instance" "example" {
  ami           = lookup(var.AMIS, var.AWS_REGION)
  instance_type = "t2.micro"

  # the VPC subnet
  subnet_id = aws_subnet.main-public-1.id

  # the security group
  vpc_security_group_ids = ["${aws_security_group.allow-ssh.id}"]

  # the public SSH key
  key_name = aws_key_pair.mykeypair.key_name

  user_data = data.template_file.script.rendered

  tags = {
    Name      = "EFS_TEST"
    Terraform = "true"
  }

  volume_tags = {
    Name      = "EFS_TEST_ROOT"
    Terraform = "true"
  }

}
#------------------------------------------------------------------------------
#create efs volumen for the intance
#This creates the EFS filesystem on AWS.
#----------------------------------------------------------------------------
resource "aws_efs_file_system" "efs" {
  creation_token   = "EFS Shared Data"
  performance_mode = "generalPurpose"
  tags = {
    Name = "EFS Shared Data"
  }
}

#-----------------------------------------------------------------------------
#EFS also requires a mount target,
#which gives your VMs a way to mount the EFS volume using NFS.
#The Terraform code to create a mount target looks like this:
#The file_system_id is automatically set to the efs resource's ID,
#which ties the mount target to the EFS file system
#attach the security group to the mount target to allow NFS on port 2049
#----------------------------------------------------------------------------
resource "aws_efs_mount_target" "efs" {
  file_system_id  = aws_efs_file_system.efs.id
  subnet_id       = aws_subnet.main-public-1.id
  security_groups = [aws_security_group.ingress-efs.id]
}

#----------------------------------------------------------------------------
data "template_file" "script" {
  template = file("script.tpl")
  vars = {
    efs_id = "${aws_efs_file_system.efs.id}"
  }
}

#----------------------------------------------------------------------------
output "ipaddress" {
  value = aws_instance.example.public_ip
}
#----------------------------------------------------------------------------

output "efs-id" {
  value = aws_efs_file_system.efs.id
}
#----------------------------------------------------------------------------

