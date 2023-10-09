#API Gateway
#API Gateway enables us to invoke Lambda functions using a custom domain.
#In this example, Terraform is used to set up an HTTP API Gateway and grant it permission to invoke Lambda

resource "aws_apigatewayv2_api" "httpAPI" {
  name          = var.DOMAIN_NAME
  protocol_type = "HTTP"
  target        = aws_lambda_function.nextjs.arn
}

resource "aws_lambda_permission" "apigw" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.nextjs.arn
  principal     = "apigateway.amazonaws.com"

  # The /* part allows invocation from any stage, method and resource path
  # within API Gateway.

  source_arn = "${aws_apigatewayv2_api.httpAPI.execution_arn}/*/*"
}