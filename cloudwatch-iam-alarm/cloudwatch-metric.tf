#-----------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "IAMPolicyEventCount_alarm_to_sns" {
  depends_on      = [aws_sns_topic.sns_alert_topic]
  alarm_name      = "${local.default_name}-IAMPolicyEventCount-alarm"
  actions_enabled = true
  alarm_actions = [
    "${aws_sns_topic.sns_alert_topic.arn}",
  ]
  alarm_description   = "Raises alarms if IAM policy changes occur more than 1 in 5 minutes"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  datapoints_to_alarm = 1

  evaluation_periods        = 1
  insufficient_data_actions = []
  metric_name               = "IAMPolicyEventCount"
  namespace                 = "CloudTrailMetrics"
  ok_actions                = []
  period                    = 300
  statistic                 = "Sum"
  threshold                 = 3
  treat_missing_data        = "missing"

  tags = {
    Name = "${local.default_name}-IAMPolicyEventCount-alarm"
  }
}
#------------------------------------------------------------------------------------------------------------------------
#  terraform import aws_cloudwatch_log_metric_filter.cloudwatch_log_metric_filter_for_cloudtrail /aws/apigateway/welcome:cloudwatch-IAMPolicyChanges
resource "aws_cloudwatch_log_metric_filter" "cloudwatch_log_metric_filter_for_cloudtrail" {
  name            = "${local.default_name}-IAMPolicyChanges-metric-filter-cloudtrail"
  log_group_name = "/aws/cloudtrail/cloudtrail-log-group"

  pattern        = "{($.eventName=DeleteGroupPolicy)||($.eventName=DeleteRolePolicy)||($.eventName=DeleteUserPolicy)||($.eventName=PutGroupPolicy)||($.eventName=PutRolePolicy)||($.eventName=PutUserPolicy)||($.eventName=CreatePolicy)||($.eventName=DeletePolicy)||($.eventName=CreatePolicyVersion)||($.eventName=DeletePolicyVersion)||($.eventName=AttachRolePolicy)||($.eventName=DetachRolePolicy)||($.eventName=AttachUserPolicy)||($.eventName=DetachUserPolicy)||($.eventName=AttachGroupPolicy)||($.eventName=DetachGroupPolicy)}"


  metric_transformation {
    dimensions = {}
    unit       = "None"
    name       = "IAMPolicyEventCount"
    namespace  = "CloudTrailMetrics"
    value      = "1"
  }
}