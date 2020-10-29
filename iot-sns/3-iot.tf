#--------------------------------------------------------------------------------------
# The aws iot thing(s)
#--------------------------------------------------------------------------------------
resource "aws_iot_thing" "iot-thing" {
  for_each = toset(var.iot-name)
  name = "${local.default_name}-${each.key}"
}
#--------------------------------------------------------------------------------------
# Create iot topic rule that forwards all iot messages to sns
#--------------------------------------------------------------------------------------
resource "aws_iot_topic_rule" "iot-topic-rule" {
  name = "${local.default_name}_iot_topic_rule"
  enabled = true
  sql_version =  "2016-03-23"
  sql = "SELECT * FROM 'topic/beam'"

  sns {
    message_format = "RAW"
    role_arn       = aws_iam_role.iam-role-sns.arn
    target_arn     = aws_sns_topic.iot-sns-topic.arn
  }
}
#--------------------------------------------------------------------------------------
# Output arn of iot thing(s) 
#--------------------------------------------------------------------------------------
# Get the aws iot endpoint to print out for reference
#Valid values: iot:CredentialProvider, iot:Data, iot:Data-ATS, iot:Job
#--------------------------------------------------------------------------------------
data "aws_iot_endpoint" "endpoint" {
  endpoint_type = "iot:Data-ATS"
}
#--------------------------------------------------------------------------------------
output "iot_endpoint" {
  value = data.aws_iot_endpoint.endpoint.endpoint_address
}
#--------------------------------------------------------------------------------------
