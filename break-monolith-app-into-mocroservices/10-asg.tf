#--------------------------------------------------------------
resource "aws_launch_configuration" "lc" {
  name     = "${local.default_name}-lc"
  image_id = data.aws_ami.amazon_linux.id

  instance_type = "t2.micro"
  security_groups = [ aws_security_group.sg-web.id ]
  key_name = aws_key_pair.key-pair.id

  #associate_public_ip_address = true
  iam_instance_profile = aws_iam_instance_profile.instance-RoleProfile.name
  user_data            = data.template_file.script.rendered

  #user_data = <<-EOF
  #            #!/bin/bash
  #            sudo apt-get -y update
  #            sudo apt-get -y install nginx
  #            EOF

  lifecycle {
    create_before_destroy = true
  }
}

#--------------------------------------------------------------
resource "aws_autoscaling_group" "asg" {
  name                 = "${local.default_name}-asg-alb"
  launch_configuration = aws_launch_configuration.lc.id
  vpc_zone_identifier  = module.vpc.public_subnets

  #A list of elastic load balancer names to add to the autoscaling group names.
  #Only valid for classic load balancers. For ALBs, use target_group_arns instead.
  #load_balancers = ["${aws_elb.elb.name}"]

  force_delete       = true
  min_size           = 1
  max_size           = 3
  desired_capacity   = 1 

  tag {
    key = "Name"
    value = "${local.default_name}-lc"
    propagate_at_launch = true
  }

}
#-------------------------------------------------------------------------------------------------------------------------------------
