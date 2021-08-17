#----------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-lambda-getinventory" {
  name              = "/aws/lambda/${local.default_name}-lambda-function-getinventory"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cloudwatch-lambda-lambda-function-getinventory"
  }
}
#----------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-lambda" {
  name              = "/aws/lambda/${local.default_name}-lambda-function-getorderstatus"
  retention_in_days = 14

  tags = {
    Name = "${local.default_name}-cloudwatch-lambda-lambda-function-getorderstatus"
  }
}
#----------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cw-log-gp-api-gw" {
  name = "API-Gateway-Access-Logs/${aws_api_gateway_rest_api.rest-api-acme-shoes.name}"
  #"API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.example.id}/${var.stage_name}"
  retention_in_days = 14
  tags = {
    Name = "${local.default_name}-cw-log-gp-api-gw"
  }
}
#----------------------------------------------------------------------------------------------