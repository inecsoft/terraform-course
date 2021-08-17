#----------------------------------------------------------------------------------------
# This is to optionally manage the CloudWatch Log Group for the Lambda Function.
# If skipping this resource configuration, also add "logs:CreateLogGroup" to the IAM policy below.
#----------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cw-log-group" {
  for_each          = toset(var.lambda-name)
  name              = "/aws/lambda/${aws_lambda_function.lambda-function[each.key].function_name}"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cw-log-group-${each.key}"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cw-log-group-auth" {
  name              = "/aws/lambda/${aws_lambda_function.lambda-function-auth.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cw-log-group-auth"
  }
}
#----------------------------------------------------------------------------------------