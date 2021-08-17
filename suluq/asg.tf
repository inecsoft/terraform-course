
resource "aws_iam_service_linked_role" "autoscaling" {
  aws_service_name = "autoscaling.amazonaws.com"
  description      = "A service linked role for autoscaling"
  custom_suffix    = local.default_name

  # Sometimes good sleep is required to have some IAM resources created before they can be used
  provisioner "local-exec" {
    command = "sleep 10"
  }
}


module "asg" {
  source  = "terraform-aws-modules/autoscaling/aws"
  version = "~> 3.0"

  name = "${local.default_name}-frontend-asg"

  #--------------------------------------------------------------------------------
  # Launch configuration
  lc_name = "${local.default_name}-lc"

  # Use of existing launch configuration (created outside of this module)
  #launch_configuration = aws_launch_configuration.this.name

  #create_lc = false

  #recreate_asg_when_lc_changes = true
  #---------------------------------------------------------------------------------

  #image_id                     = data.aws_ami.amazon_linux.id
  image_id                     = data.aws_ami.redhat.id
  instance_type                = "t3.micro"
  security_groups              = [aws_security_group.app_servers.id]
  associate_public_ip_address  = true
  recreate_asg_when_lc_changes = true
  key_name                     = aws_key_pair.suluq.key_name
  iam_instance_profile         = aws_iam_instance_profile.iam_assumable_role_custom-ServeriRoleProfile.arn
  user_data                    = data.template_cloudinit_config.cloudinit-redhat.rendered

  ebs_block_device = [
    {
      device_name = "/dev/xvdz"
      volume_type = "gp2" #"gp2", "io1"
      #iops                  = 300
      volume_size           = "50"
      delete_on_termination = true
      kms_key_arn           = "${aws_kms_key.suluq-kms-db.arn}"
      encrypted             = true
      #snapshot_id          = ""
    },
  ]

  root_block_device = [
    {
      volume_size = "30"
      volume_type = "gp2" #"gp2", "io1"
      #iops                  = 300
      kms_key_arn = "${aws_kms_key.suluq-kms-db.arn}"
      encrypted   = true
    },
  ]


  # Auto scaling group
  asg_name                  = "${local.default_name}-frontend-asg"
  vpc_zone_identifier       = module.vpc.public_subnets
  health_check_type         = "EC2"
  min_size                  = 1
  max_size                  = 4
  desired_capacity          = 1
  wait_for_capacity_timeout = 0
  service_linked_role_arn   = aws_iam_service_linked_role.autoscaling.arn

  #target_group_arns    =   module.alb.target_group_arns
  target_group_arns    = ["${aws_lb_target_group.front_end.arn}"]
  force_delete         = false
  termination_policies = ["OldestInstance"]


  tags = [
    {
      key                 = "Environment"
      value               = "${terraform.workspace}"
      propagate_at_launch = true
    },
    {
      key                 = "Project"
      value               = "${local.default_name}"
      propagate_at_launch = true
    },

  ]

  tags_as_map = {
    extra_tag1 = "${local.default_name}-frontend-asg"
  }

}


#------------------------------------------------------------------------------------------------
output "this_launch_configuration_id" {
  description = "The ID of the launch configuration"
  value       = module.asg.this_launch_configuration_id
}

output "this_autoscaling_group_id" {
  description = "The autoscaling group id"
  value       = module.asg.this_autoscaling_group_id
}

output "this_autoscaling_group_availability_zones" {
  description = "The availability zones of the autoscale group"
  value       = module.asg.this_autoscaling_group_availability_zones
}

output "this_autoscaling_group_vpc_zone_identifier" {
  description = "The VPC zone identifier"
  value       = module.asg.this_autoscaling_group_vpc_zone_identifier
}

output "this_autoscaling_group_load_balancers" {
  description = "The load balancer names associated with the autoscaling group"
  value       = module.asg.this_autoscaling_group_load_balancers
}

output "this_autoscaling_group_target_group_arns" {
  description = "List of Target Group ARNs that apply to this AutoScaling Group"
  value       = module.asg.this_autoscaling_group_target_group_arns
}

#--------------------------------------------------------------------------------------------------