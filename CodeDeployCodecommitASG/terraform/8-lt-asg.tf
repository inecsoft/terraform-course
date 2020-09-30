
#---------------------------------------------------------------------------------------------------------
#https://aws.amazon.com/blogs/aws/new-ec2-auto-scaling-groups-with-multiple-instance-types-purchase-options/?sc_icampaign=Adoption_Campaign_pac-edm-2020-ec2-console-spot&sc_ichannel=ha&sc_icontent=awssm-4091&sc_ioutcome=Enterprise_Digital_Marketing&sc_iplace=console-ec2-standard&trk=ha_a131L0000083LC1QAM~ha_awssm-4091&trkCampaign=pac-edm-2020-ec2-blog_spot_instances
#---------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "asg" {
  #count = 3 
  depends_on = [aws_launch_template.lt]
  name                      = "${local.default_name}-asg"
  desired_capacity          = 1
  health_check_grace_period = 300
  #"EC2" or "ELB"
  health_check_type         = "EC2"
  #launch_configuration      = aws_launch_configuration.lc.name
  max_size                  = 4
  min_size                  = 1
  default_cooldown          = 300
  enabled_metrics           = []
  load_balancers            = []
  
  vpc_zone_identifier       =  module.vpc.public_subnets

  force_delete              = true
  #wait_for_elb_capacity  =  1 

  lifecycle {
    create_before_destroy = true
  }   

  mixed_instances_policy {
    launch_template {
      launch_template_specification {
        launch_template_id = aws_launch_template.lt.id
      }
      #The list is prioritized: instances at the top of the list will be used in preference to those lower down when On-Demand instances are launched
      override {
        instance_type     = "t2.small"
        weighted_capacity = "2"
      }

      override {
        instance_type     = "t2.micro"
        weighted_capacity = "3"
      }
    }


    instances_distribution {
      on_demand_allocation_strategy = "prioritized"
      #How to allocate capacity across the Spot pools. Valid values: lowest-price, capacity-optimized.
      spot_allocation_strategy      = "lowest-price"
      spot_instance_pools           = 2
      on_demand_base_capacity       = 0
      #on-demand vs spot
      on_demand_percentage_above_base_capacity = 60
      #spot_max_price               = 0.5
    }
  }

  tag  {
    key =  "Name"
    value =  "${local.default_name}-asg-performance-instance"
    #value =  "asg-performance-instance-${count.index+1}"
    propagate_at_launch =  true 
  }

  tag {
    key                 = "${local.default_name}-CodePipeline"
    value               = "${local.default_name}-CodePipeline"
    propagate_at_launch = true 
  }
}
#---------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_policy" "asgp" {
  name                   = "${local.default_name}-asgp"
  scaling_adjustment     = 7
  #ChangeInCapacity, ExactCapacity, and PercentChangeInCapacity
  adjustment_type        = "PercentChangeInCapacity"
  cooldown               = 300
  autoscaling_group_name = aws_autoscaling_group.asg.name
  estimated_instance_warmup = 300
}

#---------------------------------------------------------------------------------------------------------
# aws_launch_template.lt:
resource "aws_launch_template" "lt" {
    name                    = "${local.default_name}-lt"

    default_version         = 1
    disable_api_termination = false
    ebs_optimized           = "false"
    
    image_id                = data.aws_ami.amazon_linux.id
    instance_type           = var.instance_type
    key_name                = aws_key_pair.codecommit-key.key_name

    #a number is required
    #latest_version          = "$Latest"
    
    vpc_security_group_ids    = [aws_security_group.ssh_security_group.id, aws_security_group.http_security_group.id]
    
    #user_data               = filebase64(data.template_file.script.rendered)
    user_data               = filebase64("script.tpl")

    #conflicts with security_group_names
    #vpc_security_group_ids  = module.vpc.public_subnets

    block_device_mappings {
        device_name = "/dev/xvda"

        ebs {
            delete_on_termination = "true"
            iops                  = 0
            volume_size           = 10
            volume_type           = "gp2"
        }
    }

    iam_instance_profile {
      name = aws_iam_instance_profile.EC2InstanceRoleProfile.name
    }

    instance_initiated_shutdown_behavior = "terminate"

    instance_market_options {
       market_type  = "spot"
       spot_options  {
          #Specify a Spot block of up to 360 minutes (6 hours) to prevent Spot Instance interruptions. Valid only for one-time requests. The valid values are 60, 120, 180, 240, 300, or 360 minutes. If you do not specify a value, your Spot Instance can be interrupted.
          block_duration_minutes  = 360
          #hibernate, stop, or terminate. (Default: terminate)
          instance_interruption_behavior =  "hibernate"
          #The maximum hourly price you're willing to pay for the Spot Instances.
          max_price = 0.4
          #The Spot Instance request type. Can be one-time, or persistent
          #persistent is not applicable for ec2 auto scaling
          spot_instance_type =  "one-time"
       }
    }

    monitoring {
        enabled = false
    }
    
    #When a network interface is provided, the security groups must be a part of it.
    # network_interfaces {
    #    associate_public_ip_address = true
    # }
   
    #The tags to apply to the resources during launch   
    # tag_specifications = {
    #     resource_type = "instance"

    #     tags = {
    #         Name = "test"
    #     }
    # }

    #A map of tags to assign to the launch template.
    tags  = {
        Name  = "${local.default_name}-lt"
    }
}
#---------------------------------------------------------------------------------------------------------

  #---------------------------------------------------------------------------------------------------------
#Provides a Target Group resource for use with Load Balancer resources.
#---------------------------------------------------------------------------------------------------------
resource "aws_lb_target_group" "tg" {
  name                               = "${local.default_name}-tg"
  deregistration_delay               = 300
  lambda_multi_value_headers_enabled = false
  load_balancing_algorithm_type      = "round_robin"
  port                               = 80
  protocol                           = "HTTP"
  proxy_protocol_v2                  = false
  slow_start                         = 0
  target_type                        = "instance"


  vpc_id                             = module.vpc.vpc_id
  
  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  stickiness {
    cookie_duration = 86400
    enabled         = false
    type            = "lb_cookie"
  }

  tags = {
    Name = "${local.default_name}-tg"
  }
}
#---------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_attachment" "tg-asg-attachment" {
  autoscaling_group_name = aws_autoscaling_group.asg.id
  alb_target_group_arn   = aws_lb_target_group.tg.arn
}
#---------------------------------------------------------------------------------------------------------

#-----------------------------------------------------------------------
resource "aws_efs_file_system" "efs" {
  creation_token   = "EFS Shared Data"
  #performance_mode = "generalPurpose"
  performance_mode = "maxIO"

  #The throughput, measured in MiB/s, that you want to provision
  #for the file system. Only applicable with throughput_mode set to
  #provisioned
 
  provisioned_throughput_in_mibps = 200 
  throughput_mode = "provisioned"

  tags = {
    Name = "${local.default_name}-EFS-Shared-Data"
  }
}
#-------------------------------------------------------
output "efs-id" {
  value = aws_efs_file_system.efs.id
}
#-----------------------------------------------------------------------
resource "aws_efs_mount_target" "efs" {
  count = 3
  file_system_id  = aws_efs_file_system.efs.id
  subnet_id       = element(module.vpc.public_subnets, count.index)
  security_groups = [ aws_security_group.ingress-efs.id ]
}
#-----------------------------------------------------------------------
data "template_file" "script" {
  template = file("script.tpl")
  vars = {
    efs_id = aws_efs_file_system.efs.id
  }
}
#-----------------------------------------------------------------------
# data "aws_instances" "asg-collecttion" {
#   instance_tags = {
#     "${local.default_name}-CodePipeline"    = "${local.default_name}-CodePipeline"
#   }
#   instance_state_names = ["running", "pending"]
# }
#-------------------------------------------------------
# output "ipaddress" {
#   value = data.aws_instances.asg-collecttion.public_ips
# }
#--------------------------------------------------------
