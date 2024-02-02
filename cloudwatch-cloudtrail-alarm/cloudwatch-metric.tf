#-----------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "ConsoleSigninFailureCount_alarm_to_sns" {
  depends_on      = [aws_sns_topic.sns_alert_topic]
  alarm_name      = "${local.default_name}-ConsoleSigninFailureCount-alarm"
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
  metric_name               = "ConsoleSigninFailureCount"
  namespace                 = "CloudTrailMetrics"
  ok_actions                = []
  period                    = 300
  statistic                 = "Sum"
  threshold                 = 3
  treat_missing_data        = "missing"

  tags = {
    Name = "${local.default_name}-ConsoleSigninFailureCount-alarm"
  }
}
#------------------------------------------------------------------------------------------------------------------------
#  terraform import aws_cloudwatch_log_metric_filter.cloudwatch_log_metric_filter_for_cloudtrail /aws/apigateway/welcome:cloudwatch-ConsoleSignInFailures
resource "aws_cloudwatch_log_metric_filter" "cloudwatch_log_metric_filter_for_cloudtrail" {
  name            = "${local.default_name}-ConsoleSignInFailures-metric-filter-cloudtrail"
  log_group_name = "/aws/cloudtrail/cloudtrail-log-group"

  pattern        = "{ ($.eventName = ConsoleLogin) && ($.errorMessage = \"Failed authentication\") }"

  metric_transformation {
    dimensions = {}
    unit       = "None"
    name       = "ConsoleSigninFailureCount"
    namespace  = "CloudTrailMetrics"
    value      = "1"
  }
}