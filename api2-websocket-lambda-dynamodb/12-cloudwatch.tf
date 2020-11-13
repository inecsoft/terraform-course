#----------------------------------------------------------------------------------------
# This is to optionally manage the CloudWatch Log Group for the Lambda Function.
# If skipping this resource configuration, also add "logs:CreateLogGroup" to the IAM policy below.
#----------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cw-log-group-disconnect" {
  name              = "/aws/lambda/${aws_lambda_function.lambda-function-disconnect.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cw-log-group-disconnect"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cw-log-group-connect" {
  name              = "/aws/lambda/${aws_lambda_function.lambda-function-connect.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cw-log-group-connect"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cw-log-group-default" {
  name              = "/aws/lambda/${aws_lambda_function.lambda-function-default.function_name}"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cw-log-group-default"
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