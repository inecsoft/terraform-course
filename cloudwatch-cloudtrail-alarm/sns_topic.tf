#-------------------------------------------------------------------------------
resource "aws_sns_topic" "sns_alert_topic" {
  name                                     = "${local.default_name}-ConsoleSignInFailures_CloudWatch_Alarms_Topic"
  application_success_feedback_sample_rate = 0
  http_success_feedback_sample_rate        = 0
  lambda_success_feedback_sample_rate      = 0
  policy                                   = data.aws_iam_policy_document.sns-topic-policy.json
  delivery_policy                          = <<-EOF
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
    "disableSubscriptionOverrides": false
  }
}
  EOF
  sqs_success_feedback_sample_rate         = 0

  tags = {
    Name = "${local.default_name}-sns-alert"
  }
}
#-------------------------------------------------------------------------------
data "aws_iam_policy_document" "sns-topic-policy" {

  version   = "2008-10-17"
  policy_id = "__default_policy_ID"

  statement {
    sid    = "__default_statement_ID"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions = [
      "SNS:GetTopicAttributes",
      "SNS:SetTopicAttributes",
      "SNS:AddPermission",
      "SNS:RemovePermission",
      "SNS:DeleteTopic",
      "SNS:Subscribe",
      "SNS:ListSubscriptionsByTopic",
      "SNS:Publish",
      "SNS:Receive"
    ]
    resources = [
      "arn:aws:sns:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:${local.default_name}-billing-alarm-notification",
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceOwner"

      values = ["${data.aws_caller_identity.current.account_id}"]

    }
  }
}
#-------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "sns-topic" {
  #provider  = "aws.sns"
  topic_arn                       = aws_sns_topic.sns_alert_topic.arn
  confirmation_timeout_in_minutes = 5
  protocol                        = "sms"
  endpoint                        = "+447518527690"
  raw_message_delivery            = false
}
#-------------------------------------------------------------------------------
