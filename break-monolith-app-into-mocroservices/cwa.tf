#-----------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cw-metric-alarm-out" {
    alarm_name          = "${local.default_name}-cw-metric-alarm-out"
    comparison_operator = "GreaterThanThreshold"
    evaluation_periods  = "3"
    metric_name         = "CPUUtilization"
    namespace           = "AWS/ECS"
    period              = "60"
    statistic           = "Average"
    threshold           = "80.0"
    alarm_description   = "DO NOT EDIT OR DELETE. For TargetTrackingScaling policy ."
    alarm_actions       = [ aws_autoscaling_policy.asg-policy.arn ]
  
    # dimensions {
    #     ClusterName = "inecsoft-ECSCluster-TqlJVKkUJStF"
    #     ServiceName = "inecsoft"
    # }
}
#-----------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cw-metric-alarm-in" {
    alarm_name          = "${local.default_name}-cw-metric-alarm-in"
    comparison_operator = "LessThanThreshold"
    evaluation_periods  = "15"
    metric_name         = "CPUUtilization"
    namespace           = "AWS/ECS"
    period              = "60"
    statistic           = "Average"
    threshold           = "72.0"
    alarm_description   = "DO NOT EDIT OR DELETE. For TargetTrackingScaling policy"
    alarm_actions       = [ aws_autoscaling_policy.asg-policy.arn ]

    # dimensions {
    #     ClusterName = "inecsoft-ECSCluster-TqlJVKkUJStF"
    #     ServiceName = "inecsoft"
    # }
}
#-----------------------------------------------------------------------------
resource "aws_autoscaling_policy" "asg-policy" {
  name                   = "${local.default_name}-asg-policy"

  #SimpleScaling", "StepScaling" or "TargetTrackingScaling"
  policy_type = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }

    target_value           = 80
  }
    
  autoscaling_group_name = aws_autoscaling_group.asg.name
}
#-------------------------------------------------------------------------------------------------------------------------------------