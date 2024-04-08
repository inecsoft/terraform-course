#-----------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "IAMPolicyEventCount_alarm_to_sns" {
  depends_on      = [aws_sns_topic.sns_alert_topic]
  alarm_name      = "${local.default_name}-IAMPolicyEventCount-alarm"
  actions_enabled = true
  alarm_actions = [
    "${aws_sns_topic.sns_alert_topic.arn}",
  ]
  alarm_description   = "Raises alarms if more than 3 console sign-in failures occur in 5 minutes"
  comparison_operator = "GreaterThanOrEqualToThreshold"
  datapoints_to_alarm = 1
  # dimensions = {
  #   "Currency" = "${var.currency}"
  # }
  evaluation_periods        = 1
  insufficient_data_actions = []
  metric_name               = "IAMPolicyEventCount"
  namespace                 = "iamMetrics"
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
#  terraform import aws_cloudwatch_log_metric_filter.cloudwatch_log_metric_filter_for_iam /aws/apigateway/welcome:cloudwatch-IAMPolicyEventCount
resource "aws_cloudwatch_log_metric_filter" "cloudwatch_log_metric_filter_for_iam" {
  name            = "${local.default_name}-IAMPolicyEventCount-metric-filter-iam"
  log_group_name = "/aws/iam/iam-log-group"

  pattern        = "{ ($.eventName = ConsoleLogin) && ($.errorMessage = \"Failed authentication\") }"

  metric_transformation {
    dimensions = {}
    unit       = "None"
    name       = "IAMPolicyEventCount"
    namespace  = "iamMetrics"
    value      = "1"
  }
}