#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-log-group-lambda" {
  name              = "/aws/lambda/${var.FUNCTION_NAME}"
  retention_in_days = 14

  tags = {
    Name        = "${local.default_name}-cloudwatch-log-group-lambda"
  }
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_lambda_permission" "lambda-permission-allow-cloudwatch-lambda" {
  statement_id  = "${local.default_name}-AllowExecutionFromCloudWatchlambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.cloudwatch-event-rule-trigger-lambda.arn
  #qualifier     = aws_lambda_alias.test_alias.name
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_target" "cloudwatch-event-target-trigger-lambda" {
  target_id = "${local.default_name}-cloudwatch-event-target"
  rule      = aws_cloudwatch_event_rule.cloudwatch-event-rule-trigger-lambda.name
  arn       = aws_lambda_function.lambda-function.arn
  input = <<DOC
  {  "crsCode": "${var.FUNCTION_NAME}"  }
DOC

}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_rule" "cloudwatch-event-rule-trigger-lambda" {
  name                = "${local.default_name}-schedule-lambda"
  description         = "Cron for ${local.default_name}-schedule-lambda"
  schedule_expression = "cron(0 20 * * ? *)"
  is_enabled          = true

  tags = {
    Name = "${local.default_name}-cloudwatch-event-rule" 
  }
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_metric_filter" "cloudwatch-log-metric-filter-Monitoring-Alerter-error" {
  name           = "${local.default_name}-cloudwatch-log-metric-filter-Monitoring-Alerter-error"
  # statusCode is typically 4XX for a client error and 5XX for a server error  #[host, logName, user, timestamp, request, statusCode=4*, size]  #{ $.errorCode = "AccessDenied" }  #ERROR  
  pattern        = "[ statusCode=4*, ERROR ]"    
  log_group_name = "/aws/lambda/${local.default_name}-cloudwatch-metric-alarm"
  metric_transformation {    
    name          = "${local.default_name}-cloudwatch-log-metric-filter-MonitoringAlerter-error"
    namespace     = "LogMetrics"
    value         = 1    
    default_value = 0.0  
  }
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cloudwatch-metric-alarm-Monitoring-Alerter-error" {
  alarm_name                = "${local.default_name}-cloudwatch-metric-alarm-Monitoring-Alerter-error"
  evaluation_periods        = 1
  comparison_operator       = "GreaterThanThreshold"
  datapoints_to_alarm       = 1  
  metric_name               = "${local.default_name}-cloudwatch-metric-alarm-Monitoring-Alerter-error"   
  namespace                 = "LogMetrics"  
  period                    = 900   
  statistic                 = "Maximum"  
  threshold                 = 1  
  treat_missing_data        = "notBreaching"
  actions_enabled           = "true"  
  alarm_actions             = [ aws_sns_topic.sns-topic-alarm.arn ]    
  
  tags = {    
    Environment = local.default_name    
    Name        = "${local.default_name}-cloudwatch-metric-alarm-Monitoring-Alerter-error"
  }
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cloudwatch-metric-alarm-Monitoring-Alerter" {  
  alarm_name                = "${local.default_name}-cloudwatch-metric-alarm-Monitoring-Alerter"  
  alarm_description         = "this notifies if lambda lambda_cloudwatch-metric-alarm was not triggered every hour"  
  evaluation_periods        = 1  
  comparison_operator       = "LessThanThreshold"  
  datapoints_to_alarm       = 1  
  namespace                 = "AWS/Events"  
  metric_name               = "Invocations"     
  period                    = 3600   
  statistic                 = "SampleCount"  
  threshold                 = 1  
  treat_missing_data        = "breaching"  
  actions_enabled           = "true"  
  alarm_actions             = [ aws_sns_topic.sns-topic-alarm.arn ]

  tags = {    
    Environment = local.default_name    
    Name        = "${local.default_name}-cloudwatch-metric-alarm-Monitoring-Alerter"
  }
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_sns_topic" "sns-topic-alarm" {
  name = "${local.default_name}-sns-topic-alarm"
  delivery_policy = <<EOF
{
  "http": {
    "defaultHealthyRetryPolicy": {
      "minDelayTarget": 20,
      "maxDelayTarget": 20,
      "numRetries": 3,
      "numMaxDelayRetries": 0,
      "numNoDelayRetries": 0,
      "numMinDelayRetries": 0,
      "backoffFunction": "linear"
    },
    "disableSubscriptionOverrides": false,
    "defaultThrottlePolicy": {
      "maxReceivesPerSecond": 1
    }
  }
}
EOF

  tags = {
    Name   =  "${local.default_name}-sns-topic-alarm"
  } 
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_sns_topic_policy" "sns-topic-policy-sns-topic-alarm" {
  arn = aws_sns_topic.sns-topic-alarm.arn

  policy = data.aws_iam_policy_document.iam-policy-doc-sns-topic-alarm.json
}
#-------------------------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-sns-topic-alarm" {  
  statement {    
    effect    = "Allow"    
    resources = [ aws_sns_topic.sns-topic-alarm.arn ]    
    actions   = ["SNS:Publish"]
    condition {      
      test     = "StringEquals"      
      variable = "aws:SourceAccount"      
      values   = [ data.aws_caller_identity.current.id ]    
    }
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
  }
}
#-------------------------------------------------------------------------------------------------------------------------