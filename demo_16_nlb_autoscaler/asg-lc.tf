#--------------------------------------------------------------
resource "aws_launch_configuration" "autoscale_launch" {
  name     = "web_config"
  image_id = "${lookup(var.AMIS, var.AWS_REGION)}"
  instance_type = "t2.micro"
  security_groups = ["${aws_security_group.sec_web.id}"]
  key_name = "${aws_key_pair.keypair.id}"
  #associate_public_ip_address = true
  iam_instance_profile = "${aws_iam_instance_profile.CloudwatchAgentServerRoleProfile.name}"
  user_data       = "${data.template_file.script.rendered}"

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
resource "aws_autoscaling_group" "autoscale_group" {
  name                 = "asg-nlb"
  launch_configuration = "${aws_launch_configuration.autoscale_launch.id}"
  vpc_zone_identifier  = ["${aws_subnet.main-public-1.id}","${aws_subnet.main-public-2.id}","${aws_subnet.main-public-3.id}"]
  #A list of elastic load balancer names to add to the autoscaling group names.
  #Only valid for classic load balancers. For ALBs, use target_group_arns instead.
  #load_balancers = ["${aws_elb.elb.name}"]

  force_delete              = true
  min_size = 1
  max_size = 3
  desired_capacity   = 1 

  
  tag {
    key = "Name"
    value = "autoscale"
    propagate_at_launch = true
  }
}
#--------------------------------------------------------------#-----------------------------------------------------------------------
