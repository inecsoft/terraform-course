#https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/codedeploy_deployment_config
#---------------------------------------------------------------------------------
resource "aws_codedeploy_app" "codedeploy-app-lambda" {
  compute_platform = "Lambda"
  name             = "${local.default_name}-codedeploy-app-lambda"
}
#--------------------------------------------------------------------------------
resource "aws_codedeploy_deployment_config" "codedeploy-deployment-config" {
  deployment_config_name = "${local.default_name}-deployment-config"
  compute_platform       = "Lambda"

  traffic_routing_config {
    type = "TimeBasedLinear"

    time_based_linear {
      interval   = 10
      percentage = 10
    }
  }
}
#--------------------------------------------------------------------------------
resource "aws_codedeploy_deployment_group" "codedeploy-deployment-group" {
  app_name               = aws_codedeploy_app.codedeploy-app-lambda.name
  deployment_group_name  = "${local.default_name}-codedeploy-deployment-group"
  service_role_arn       = aws_iam_role.iam-role-codedeploy.arn
  deployment_config_name = aws_codedeploy_deployment_config.codedeploy-deployment-config.id

  auto_rollback_configuration {
    enabled = true
    events  = ["DEPLOYMENT_FAILURE"]
  }

  alarm_configuration {
    alarms  = ["${local.default_name}-sns-topic-deploy"]
    enabled = true
  }

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "BLUE_GREEN"
  }

  # trigger_configuration {
  #   trigger_events     = ["DeploymentFailure"]
  #   trigger_name       = "${local.default_name}-fail-codedeploy-alarm"
  #   trigger_target_arn = aws_sns_topic.sns-topic-deploy.arn
  # }
}
#--------------------------------------------------------------------------------