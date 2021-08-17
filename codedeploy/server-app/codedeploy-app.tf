#----------------------------------------------------------------------
resource "aws_codedeploy_app" "DemoApplication" {
  #The compute platform can either be ECS, Lambda, or Server
  compute_platform = "Server"
  name             = "DemoApplication"
}

#----------------------------------------------------------------------
#to be able to import this resource
#terraform import aws_codedeploy_deployment_group.DemoDeploymentGroup DemoApplication:DemoDeploymentGroup
#----------------------------------------------------------------------
resource "aws_codedeploy_deployment_group" "DemoDeploymentGroup" {
  app_name               = "DemoApplication"
  autoscaling_groups     = []
  deployment_config_name = "CodeDeployDefault.OneAtATime"
  deployment_group_name  = "DemoDeploymentGroup"
  service_role_arn       = aws_iam_role.CodeDeployRole1.arn

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "IN_PLACE"
  }

  ec2_tag_set {
    ec2_tag_filter {
      key   = "Name"
      type  = "KEY_AND_VALUE"
      value = "CodePipelineDemo"
    }
  }

  load_balancer_info {

    target_group_info {
      name = "targetgroupcodedeploy"
    }
  }
}
#----------------------------------------------------------------------
