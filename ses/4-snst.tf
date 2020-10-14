
#----------------------------------------------------------------------------------------
resource "aws_sns_topic" "sns-topic-ses-notification" {
  name            = "${local.default_name}-ses-notification"
  display_name    = "${local.default_name}-ses-notification"
  policy          = <<POLICY
{
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Sid": "__default_statement_ID",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish",
        "SNS:Receive"
      ],
      "Resource": "arn:aws:sns:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:${local.default_name}-ses-notification",
      "Condition": {
        "StringEquals": {
          "AWS:SourceOwner": "${data.aws_caller_identity.current.account_id}"
        }
      }
    }
  ]
}
POLICY

  tags = {
    Name = "${local.default_name}-ses-notification"

  }
}
#----------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "sns-topic-subscription-ses-sns" {
  #provider  = "aws.sns"
  topic_arn = aws_sns_topic.sns-topic-ses-notification.arn
  confirmation_timeout_in_minutes = 5
  protocol  = "sms"
  endpoint  = "+447518527690"
  raw_message_delivery = false 
}
#-------------------------------------------------------------------------------
#emil protocol is not supported by sns subscription only [application http https lambda sms sqs]
#-------------------------------------------------------------------------------
# resource "aws_sns_topic_subscription" "sns-topic-subscription-ses-email" {
#   topic_arn                       = aws_sns_topic.sns-topic-ses-notification.arn
#   protocol                        = "email-json"
#   endpoint                        = "ivanpedrouk@gmail.com"
#   raw_message_delivery            = "false"
# }
#-------------------------------------------------------------------------------