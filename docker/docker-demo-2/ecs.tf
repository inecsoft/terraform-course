#---------------------------------------------------------------------------------------------------------------
#define the ECS cluster 
#---------------------------------------------------------------------------------------------------------------
resource "aws_ecs_cluster" "example-cluster" {
  name = "example-cluster"
}

#---------------------------------------------------------------------------------------------------------------
#an autoscaling group launches EC2 instances that will join this cluester
#---------------------------------------------------------------------------------------------------------------
resource "aws_launch_configuration" "ecs-example-launchconfig" {
  name_prefix          = "ecs-launchconfig"
  image_id             = var.ECS_AMIS[var.AWS_REGION]
  instance_type        = var.ECS_INSTANCE_TYPE
  key_name             = aws_key_pair.mykeypair.key_name
  iam_instance_profile = aws_iam_instance_profile.ecs-ec2-role.id
  security_groups      = [aws_security_group.ecs-securitygroup.id]

  user_data = "#!/bin/bash\necho 'ECS_CLUSTER=example-cluster' > /etc/ecs/ecs.config\nstart ecs"
  #user_data = <<-EOF
  #            #!/bin/bash
  #            echo 'ECS_CLUSTER=example-cluster' > /etc/ecs/ecs.config
  #            start ecs
  #            EOF


  lifecycle {
    create_before_destroy = true
  }
}

#---------------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "ecs-example-autoscaling" {
  name = "ecs-example-autoscaling"

  # change the public subnets to private subnet to be more secure but you can not access these instance 
  # directly but with a bastion

  vpc_zone_identifier  = [aws_subnet.main-public-1.id, aws_subnet.main-public-2.id]
  launch_configuration = aws_launch_configuration.ecs-example-launchconfig.name
  min_size             = 1
  max_size             = 1
  tag {
    key                 = "Name"
    value               = "ecs-ec2-container"
    propagate_at_launch = true
  }
}

#---------------------------------------------------------------------------------------------------------------
