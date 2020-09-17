#-------------------------------------------------------------------------------------
resource "aws_sns_topic" "snsNotificationTopic" {
  name            = "${terraform.workspace}-snsNotificationTopic"
  display_name    = "${terraform.workspace}-snsNotificationTopic"

  tags = {
    Name = "${terraform.workspace}"
  }
}
#-------------------------------------------------------------------------------------
resource "aws_sns_topic_policy" "snsNotificationTopic-Policy" {
  arn =  aws_sns_topic.snsNotificationTopic.arn
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
      "Resource": "${aws_sns_topic.snsNotificationTopic.arn}",
      "Condition": {
        "StringEquals": {
          "AWS:SourceOwner": "${data.aws_iam_account_alias.current.account_alias}"
        }
      }
    }
  ]
}
POLICY
}
#-------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "sns-topic" {
  #provider  = "aws.sns"
  topic_arn = aws_sns_topic.snsNotificationTopic.arn
  confirmation_timeout_in_minutes = 5
  #not supported
  #protocol  = "email"
  protocol  = "sms"
  endpoint  = "+447518527690"
  raw_message_delivery = false 
}
#-------------------------------------------------------------------------------
output "sns-topic" {
  value = aws_sns_topic.snsNotificationTopic.arn
}
#-------------------------------------------------------------------------------
