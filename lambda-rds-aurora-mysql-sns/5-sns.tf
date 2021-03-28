#--------------------------------------------------------------------------------------
# Create an sns topic
#--------------------------------------------------------------------------------------
resource "aws_sns_topic" "sns-topic" {
  name         = "${local.default_name}-wbc-order-notification"
  display_name = "${local.default_name}-wbc-order-notification"

  tags = {
    Name = "${local.default_name}-wbc-order-notification"
  }
}
#--------------------------------------------------------------------------------------
# Subscribe to sns topic with endpoint of our phone number
#--------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "sns-topic-subcription" {
  topic_arn = aws_sns_topic.sns-topic.arn
  protocol  = "sms"
  endpoint  = var.phone_number
}
#--------------------------------------------------------------------------------------
