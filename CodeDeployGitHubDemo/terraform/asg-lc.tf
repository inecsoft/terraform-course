#---------------------------------------------------------------------------------------------------------
resource "aws_launch_configuration" "performance" {
    name                        = "performance"
    image_id                    = "${lookup(var.AMIS, var.AWS_REGION)}"
    instance_type               = "${var.instance_type}"
    key_name                    = "${aws_key_pair.mykey.key_name}"
    associate_public_ip_address = true
    enable_monitoring           = false
    ebs_optimized               = false
    
    user_data               = "${data.template_file.script.rendered}"
    #change the security group to private by using different file
    security_groups         = ["${aws_security_group.my_security_group.id}", "${aws_security_group.http_security_group.id}"]
    #iam_instance_profile    = "${aws_iam_role.EC2InstanceRole.name}"
    iam_instance_profile    = "${aws_iam_instance_profile.EC2InstanceRoleProfile.name}"
    
    root_block_device {
      delete_on_termination = true
      encrypted             = false
      iops                  = 100
      volume_size           = 10
      volume_type           = "gp2"
     }

#    lifecycle {
#       create_before_destroy = false 
#    }
}
#---------------------------------------------------------------------------------------------------------
#if you add count it will deploy an autoscaler per AZ
#---------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "performance" {
    #count = 3 
    desired_capacity          = 1 
    health_check_grace_period = 0
    health_check_type         = "EC2"
    launch_configuration      = "${aws_launch_configuration.performance.name}"
    max_size                  = 3
    min_size                  = 1
    default_cooldown          = 300
    enabled_metrics           = []
    load_balancers            = []
    name                      = "performance"
    #name                      = "performance-${count.index+1}"
    vpc_zone_identifier       = ["${aws_subnet.my_vpc_subnet_public[0].id}","${aws_subnet.my_vpc_subnet_public[1].id}","${aws_subnet.my_vpc_subnet_public[2].id}"]
    #vpc_zone_identifier       = ["${element(aws_subnet.my_vpc_subnet_public[*].id, count.index)}"]
    #availability_zones        = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
 
    lifecycle {
       create_before_destroy = false
    }   

    tag  {
     key =  "Name"
     value =  "asg-performance-instance"
     #value =  "asg-performance-instance-${count.index+1}"
     propagate_at_launch =  true 
    }
   tag {
    key                 = "CodePipelineDemo"
    value               = "CodePipelineDemo"
    propagate_at_launch = true 
  }

}
#---------------------------------------------------------------------------------------------------------
#Provides a Target Group resource for use with Load Balancer resources.
#---------------------------------------------------------------------------------------------------------
resource "aws_lb_target_group" "deploymentgroup-targetgroup" {
  name     = "deploymentgroup-targetgroup"
  port     = 80
  protocol = "HTTP"
  vpc_id   = "${aws_vpc.my_vpc.id}"
  
  tags = {
    Name = "deploymentgroup-targetgroup"
 
  }
}

#---------------------------------------------------------------------------------------------------------
data "aws_instances" "deploymentgroup-targetgroup-attach" {
  depends_on = [aws_lb_target_group.deploymentgroup-targetgroup]
  instance_tags = {
    CodePipelineDemo = "CodePipelineDemo"
  }

  # filter {
  #  name   = "instance.group-id"
  #  values = ["sg-12345678"]
  # }

 # instance_state_names = ["running"]
}
#---------------------------------------------------------------------------------------------------------
resource "aws_lb_target_group_attachment" "deploymentgroup-targetgroup-attach" {
  #depends_on = [data.aws_instances.deploymentgroup-targetgroup-attach]
  #count            = "${length(data.aws_instances.deploymentgroup-targetgroup-attach.ids)}"
  target_group_arn = "${aws_lb_target_group.deploymentgroup-targetgroup.arn}"
  #target_id        = "${data.aws_instances.deploymentgroup-targetgroup-attach.ids[count.index]}"
  target_id        = "${data.aws_instances.deploymentgroup-targetgroup-attach.ids[0]}"
  port             = 80
}
#---------------------------------------------------------------------------------------------------------

