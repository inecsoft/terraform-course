#-------------------------------------------------------------------------
data "template_file" "userdata" {
   template = "${file("scripts/userdata.tpl")}"
   vars = {
       AWS_REGION = "${var.AWS_REGION}"
    }
}
#-------------------------------------------------------------------------
resource "aws_instance" "ApplicationHostInstance" {
   ami = data.aws_ami.redhat.id
   instance_type = "t2.micro"
   key_name = aws_key_pair.sshkey.key_name
   iam_instance_profile = aws_iam_instance_profile.ApplicationHostInstanceProfile.name
  
  # the VPC subnet
   subnet_id = module.vpc.private_subnets[0]
  
  # the security group
  vpc_security_group_ids = [aws_security_group.ApplicationNatSecurityGroup.id]

  #associate_public_ip_address = true
  # user data
  user_data = data.template_file.userdata.rendered

  root_block_device {
     volume_type = "gp2"
     volume_size = "10"
     delete_on_termination = true
   }

  tags = {
    "Name" = "${local.default_name}"
  }

}

#-------------------------------------------------------------------------

