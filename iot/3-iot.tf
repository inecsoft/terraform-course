#--------------------------------------------------------------------------------------
# The aws iot thing(s)
#--------------------------------------------------------------------------------------
resource "aws_iot_thing" "iot-thing" {
  for_each = toset(var.iot-name)
  name = "${local.default_name}-${each.key}"
  thing_type_name = aws_iot_thing_type.iot-type.name
}
#--------------------------------------------------------------------------------------
# Create iot topic rule that forwards all iot messages to sns
#$aws/things/${local.default_name}-${each.key}/shadow
#$aws/things/${local.default_name}-${each.key}/shadow/update/accepted
#--------------------------------------------------------------------------------------
resource "aws_iot_topic_rule" "iot-topic-rule" {
  for_each = toset(var.iot-name)
  name = "${local.default_name}_iot_topic_rule"
  description = "The description of the rule."
  enabled = true

  sql_version =  "2016-03-23"
  sql = "SELECT * FROM '$aws/things/${local.default_name}-${each.key}/shadow/update/accepted'"

  sns {
    message_format = "RAW"
    role_arn       = aws_iam_role.iam-role-sns.arn
    target_arn     = aws_sns_topic.iot-sns-topic.arn
  }

#   lambda {
#     #(Required) The ARN of the Lambda function.
#     function_arn = aws_lambda_function.lambda-func.arn
#   }

  tags = {
    Name = "${local.default_name}-iot-topic-rule"
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
