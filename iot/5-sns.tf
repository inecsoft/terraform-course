#--------------------------------------------------------------------------------------
# Create an sns topic
#--------------------------------------------------------------------------------------
resource "aws_sns_topic" "iot-sns-topic" {
  name = "${local.default_name}-iot-sns-topic"
}
#--------------------------------------------------------------------------------------
# Subscribe to sns topic with endpoint of our phone number
#--------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "iot-sns-topic-subcription" {
  topic_arn = aws_sns_topic.iot-sns-topic.arn
  protocol  = "sms"
  endpoint  = var.phone_number
}
#--------------------------------------------------------------------------------------
