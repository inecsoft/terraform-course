#----------------------------------------------------------------------
resource "aws_codedeploy_app" "codedeploy-app" {
  #The compute platform can either be ECS, Lambda, or Server
  compute_platform = "Server"
  name             = "${local.default_name}-codedeploy-app"
}
#----------------------------------------------------------------------
#to be able to import this resource
#terraform import aws_codedeploy_deployment_group.DemoDeploymentGroup DemoApplication:DemoDeploymentGroup
# aws_codedeploy_deployment_group.CodeDeploymentGroup:
#s3://aws-codedeploy-eu-west-1/samples/latest/SampleApp_Linux.zip
#----------------------------------------------------------------------
resource "aws_codedeploy_deployment_group" "CodeDeploymentGroup" {
  app_name               = aws_codedeploy_app.codedeploy-app.name
  autoscaling_groups     = [aws_autoscaling_group.autoscaling.name]
  deployment_config_name = "CodeDeployDefault.OneAtATime"
  deployment_group_name  = "${local.default_name}-CodeDeploymentGroup"
  service_role_arn       = aws_iam_role.CodeDeployTrustRole.arn

  deployment_style {
    deployment_option = "WITH_TRAFFIC_CONTROL"
    deployment_type   = "IN_PLACE"
  }

  #    ec2_tag_set {
  #        ec2_tag_filter {
  #            key   = "Name"
  #            type  = "KEY_AND_VALUE"
  ##            value = "CodePipelineDemo"
  #        }
  #    }
  #
  #    load_balancer_info {
  #
  #        target_group_info {
  #            name = "targetgroupcodedeploy"
  #        }
  #    }
}
#----------------------------------------------------------------------
#terraform import aws_codedeploy_app.CodeDeployConfig deployment-config-name
#----------------------------------------------------------------------
#resource "aws_codedeploy_deployment_config" "CodeDeployConfig" {
#  deployment_config_name = "${local.default_name}-deployment-config"
#
#  minimum_healthy_hosts {
#    type  = "HOST_COUNT"
#    value = 2
#  }
#}
#----------------------------------------------------------------------

