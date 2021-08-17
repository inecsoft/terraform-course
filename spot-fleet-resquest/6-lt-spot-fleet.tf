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

  vpc_security_group_ids = [aws_security_group.ssh_security_group.id, aws_security_group.http_security_group.id]

  user_data = filebase64("script.tpl")

  iam_instance_profile {
    name = aws_iam_instance_profile.EC2InstanceRoleProfile.name
  }

  instance_market_options {
    market_type = "spot"

    spot_options {
      block_duration_minutes = 0
      spot_instance_type     = "one-time"
    }
  }

  tags = {
    Name = "${local.default_name}-lt"
  }
}
#---------------------------------------------------------------------------------------
resource "aws_spot_fleet_request" "spot-fleet-resquest" {
  iam_fleet_role  = aws_iam_role.ec2-spot-fleet-tagging-role.arn
  spot_price      = "0.005"
  target_capacity = 2
  valid_until     = "2020-11-04T20:44:20Z"


  allocation_strategy                = "lowestPrice"
  excess_capacity_termination_policy = "Default"
  fleet_type                         = "maintain"
  wait_for_fulfillment               = false
  instance_interruption_behaviour    = "terminate"
  instance_pools_to_use_count        = 1
  #spot_price                          = "0.005"

  #load_balancers     =
  #target_group_arns  = 

  launch_template_config {
    launch_template_specification {
      id      = aws_launch_template.lt.id
      version = aws_launch_template.lt.latest_version
    }
  }

  depends_on = [
    aws_iam_policy_attachment.ec2-spot-fleet-tagging-role-policy-attachment-1,
  aws_iam_policy_attachment.ec2-spot-fleet-ec2read-role-policy-attachment-2]

  tags = {
    Name = "${local.default_name}-spot-fleet-resquest"
  }
}
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
