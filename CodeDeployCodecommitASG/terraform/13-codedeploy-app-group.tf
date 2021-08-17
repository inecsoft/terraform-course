#----------------------------------------------------------------------
resource "aws_codedeploy_app" "codedeploy-Application" {
  #The compute platform can either be ECS, Lambda, or Server
  compute_platform = "Server"
  name             = "${local.default_name}-Application"
}

#----------------------------------------------------------------------
#to be able to import this resource
#terraform import aws_codedeploy_deployment_group.DemoDeploymentGroup DemoApplication:DemoDeploymentGroup
#----------------------------------------------------------------------
resource "aws_codedeploy_deployment_group" "codedeploy-DeploymentGroup" {
  app_name               = aws_codedeploy_app.codedeploy-Application.name
  autoscaling_groups     = [aws_autoscaling_group.asg.name]
  deployment_config_name = "CodeDeployDefault.OneAtATime"
  deployment_group_name  = "${local.default_name}-DeploymentGroup"
  service_role_arn       = aws_iam_role.CodeDeployRole.arn

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "IN_PLACE"
  }

  trigger_configuration {
    trigger_events     = ["DeploymentFailure"]
    trigger_name       = "${local.default_name}-trigger"
    trigger_target_arn = aws_sns_topic.snsNotificationTopic.arn
  }

  alarm_configuration {
    alarms  = ["${local.default_name}-alarm"]
    enabled = true
  }

  ec2_tag_set {
    ec2_tag_filter {
      key   = "${local.default_name}-CodePipeline"
      type  = "KEY_AND_VALUE"
      value = "${local.default_name}-CodePipeline"
    }
  }

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  load_balancer_info {

    target_group_info {
      name = aws_lb_target_group.tg.name
    }
  }
}
#----------------------------------------------------------------------
