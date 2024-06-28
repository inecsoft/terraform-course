resource "aws_cloudwatch_event_rule" "cloudwatch_event_rule_schedule" {
  name                = "cw_event_rule_schedule"
  description         = "schedule excecution every hour"
  schedule_expression = "rate(1 hour)"
}

resource "aws_cloudwatch_event_target" "cloudwatch_event_target_sns" {
  rule      = aws_cloudwatch_event_rule.cloudwatch_event_rule_schedule.name
  target_id = "SendToSNS"
  arn       = aws_sns_topic.sns_topic_cloudwatch_event_schedule.arn

  retry_policy {
    maximum_event_age_in_seconds = 60
    maximum_retry_attempts       = 5
  }
}

resource "aws_sns_topic" "sns_topic_cloudwatch_event_schedule" {
  name              = "cw_event_rule_schedule-sns"
  display_name      = "cw_event_rule_schedule-sns"
  kms_master_key_id = "alias/aws/sns"
}

resource "aws_sns_topic_policy" "sns_topic_policy" {
  arn    = aws_sns_topic.sns_topic_cloudwatch_event_schedule.arn
  policy = data.aws_iam_policy_document.sns_topic_policy.json
}

data "aws_iam_policy_document" "sns_topic_policy" {
  statement {
    effect  = "Allow"
    actions = ["SNS:Publish"]

    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }

    resources = [aws_sns_topic.sns_topic_cloudwatch_event_schedule.arn]
  }
}

# Subscribe to sns topic with endpoint of our phone number
#--------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "aws-config-sns-topic-subcription" {
  topic_arn              = aws_sns_topic.sns_topic_cloudwatch_event_schedule.arn
  protocol               = "sms"
  endpoint               = var.phone_number
  endpoint_auto_confirms = false
  filter_policy          = null
  filter_policy_scope    = null
  delivery_policy        = null
  raw_message_delivery   = false
  subscription_role_arn  = null
}