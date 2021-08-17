#-------------------------------------------------------------------------------------------------------------------------
resource "aws_lambda_permission" "lambda-permission-allow-cloudwatch-lambda" {
  statement_id  = "${local.default_name}-AllowExecutionFromCloudWatchlambda"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.cloudwatch-event-rule-trigger-lambda.arn
  #qualifier     = aws_lambda_alias.test_alias.name
}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_target" "cloudwatch-event-target-trigger-lambda" {
  target_id = "${local.default_name}-cloudwatch-event-target"
  rule      = aws_cloudwatch_event_rule.cloudwatch-event-rule-trigger-lambda.name
  arn       = aws_lambda_function.lambda-function.arn
  #   input = <<DOC
  #   {  "crsCode": "dss-route-data-loader"  }
  # DOC

}
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_rule" "cloudwatch-event-rule-trigger-lambda" {
  name                = "${local.default_name}-schedule-lambda"
  description         = "Cron for ${local.default_name}-schedule-lambda"
  schedule_expression = "cron(0 20 * * ? *)"
  is_enabled          = true

  tags = {
    Name = "${local.default_name}-cloudwatch-event-rule"
  }
}
#-------------------------------------------------------------------------------------------------------------------------
