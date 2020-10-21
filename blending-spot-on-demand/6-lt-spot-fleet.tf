#---------------------------------------------------------------------------------------
# aws_launch_template.lt:
#---------------------------------------------------------------------------------------
resource "aws_launch_template" "lt" {
  name                    = "${local.default_name}-lt"
  default_version         = 1
  description             = "${local.default_name}-lt"
  disable_api_termination = false
  image_id                = data.aws_ami.amazon_linux.id
  instance_type           = var.instance_type
  key_name                = aws_key_pair.codecommit-key.key_name
  
  vpc_security_group_ids  = [aws_security_group.ssh_security_group.id, aws_security_group.http_security_group.id]
  
  user_data               = filebase64("script.tpl")

  iam_instance_profile {
    name = aws_iam_instance_profile.EC2InstanceRoleProfile.name
  }

  block_device_mappings {
    device_name = "/dev/sda1"

    ebs {
      volume_size = "10"
      volume_type = "gp2"
      delete_on_termination = true
    }
  }

  instance_market_options {
    market_type = "spot"

    spot_options {
      block_duration_minutes = 0
      spot_instance_type     = "one-time"
    }
  }

  tags  = {
    Name  = "${local.default_name}-lt"
  }
}
#---------------------------------------------------------------------------------------
# resource "aws_spot_fleet_request" "spot-fleet-resquest" {
#   iam_fleet_role  = aws_iam_role.ec2-spot-fleet-tagging-role.arn
#   spot_price      = "0.005"
#   target_capacity = 2
#   valid_until     = "2020-11-04T20:44:20Z"

  
#   allocation_strategy                 = "lowestPrice"
#   excess_capacity_termination_policy  = "Default"
#   fleet_type                          = "maintain"
#   wait_for_fulfillment                = false
#   instance_interruption_behaviour     = "terminate"
#   instance_pools_to_use_count         = 1
#   #spot_price                          = "0.005"

#   #load_balancers     =
#   #target_group_arns  = 
  
#   launch_template_config {
#     launch_template_specification {
#       id      = aws_launch_template.lt.id
#       version = aws_launch_template.lt.latest_version
#     }
#   }

#   depends_on = [
#     aws_iam_policy_attachment.ec2-spot-fleet-tagging-role-policy-attachment-1,
#     aws_iam_policy_attachment.ec2-spot-fleet-ec2read-role-policy-attachment-2]
  
#   tags = {
#     Name = "${local.default_name}-spot-fleet-resquest"
#   }
# }
#---------------------------------------------------------------------------------------
output "spot_request_state" {
  description = "description - The state of the Spot fleet request."
  value       = aws_spot_fleet_request.spot-fleet-resquest.spot_request_state
}
#---------------------------------------------------------------------------------------
output "spot_request_id" {
  description = "description - The state of the Spot fleet request."
  value       = aws_spot_fleet_request.spot-fleet-resquest.id
}
#---------------------------------------------------------------------------------------
# aws_spot_fleet_request.spot-fleet-resquest:
resource "aws_spot_fleet_request" "spot-fleet-resquest" {
  allocation_strategy                 = "capacityOptimized"
  
  excess_capacity_termination_policy  = "Default"
  fleet_type                          = "maintain"
  #iam_fleet_role                      = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/aws-service-role/spotfleet.amazonaws.com/AWSServiceRoleForEC2SpotFleet"
  
  iam_fleet_role  = aws_iam_role.ec2-spot-fleet-tagging-role.arn
  #On-Demand Linux pricing 0.0126 USD per Hour
  spot_price      = "0.0126"
  
  depends_on = [
    aws_iam_policy_attachment.ec2-spot-fleet-tagging-role-policy-attachment-1,
  ]
  
  instance_interruption_behaviour     = "terminate"
  instance_pools_to_use_count         = 1
  replace_unhealthy_instances         = false
  
  
  target_capacity                     = 1
  terminate_instances_with_expiration = true
  valid_from                          = "2020-10-20T20:44:29Z"
  valid_until                         = "2021-10-20T20:44:29Z"

  launch_template_config {
    launch_template_specification {
      id      = aws_launch_template.lt.id
      version = aws_launch_template.lt.latest_version
    }
  

    overrides {
        instance_type     = "m1.medium"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 0)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m1.medium"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 1)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m1.medium"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 2)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m1.small"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 0)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m1.small"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 1)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m1.small"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 2)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m3.medium"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 0)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m3.medium"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 1)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "m3.medium"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 2)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t1.micro"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 0)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t1.micro"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 1)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t1.micro"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 2)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t2.micro"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 0)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t2.micro"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 1)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t2.micro"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 2)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t2.small"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 0)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t2.small"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 1)
        weighted_capacity = 1
    }
    overrides {
        instance_type     = "t2.small"
        priority          = 0
        subnet_id         = element(module.vpc.public_subnets, 2)
        weighted_capacity = 1
    }
  }

  timeouts {}
  
  tags = {
    Name = "${local.default_name}-spot-fleet-resquest"
  }
}