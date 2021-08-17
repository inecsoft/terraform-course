#------------------------------------------------------------------------------------------------------------
#create a launch configuration for the autoscaling group.
#It installs nginx and pushes the ip of the server to index file.
#to test curl the elb address to see how it load balance the load.
#------------------------------------------------------------------------------------------------------------
# aws_launch_configuration.launchconfig:
#------------------------------------------------------------------------------------------------------------
resource "aws_launch_configuration" "launchconfig" {
  name                        = "${local.default_name}-LaunchConfiguration"
  associate_public_ip_address = true
  ebs_optimized               = false
  enable_monitoring           = true
  iam_instance_profile        = aws_iam_instance_profile.CodeDeployInstanceProfile.name
  image_id                    = data.aws_ami.amazon_linux.id
  instance_type               = "t2.micro"
  key_name                    = aws_key_pair.key.key_name
  security_groups             = [aws_security_group.sg-app.id]
  user_data                   = data.template_cloudinit_config.cloudinit-app.rendered

  vpc_classic_link_security_groups = []

  lifecycle {
    create_before_destroy = true
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "autoscaling" {
  name                      = "${local.default_name}-autoscaling"
  vpc_zone_identifier       = [element(module.vpc.public_subnets, 1), element(module.vpc.public_subnets, 2)]
  service_linked_role_arn   = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/aws-service-role/autoscaling.amazonaws.com/AWSServiceRoleForAutoScaling"
  min_size                  = 2
  max_size                  = 2
  metrics_granularity       = "1Minute"
  health_check_grace_period = 300
  health_check_type         = "ELB"
  load_balancers            = [aws_elb.elb-app.name]
  force_delete              = true

  default_cooldown = 300
  desired_capacity = 2
  enabled_metrics  = []

  launch_configuration = aws_launch_configuration.launchconfig.name
  # launch_template {
  #    id      = "${aws_launch_template.launch-templete.id}"
  #    version = "$Latest"
  #  }

  tag {
    key                 = "Name"
    value               = "${local.default_name}-app-server"
    propagate_at_launch = true
  }
  tag {
    key                 = "Name"
    propagate_at_launch = true
    value               = "${local.default_name}-CodeDeploy"
  }
}
#----------------------------------------------------------------------------------------------------------


