#-------------------------------------------------------------------
#first step
#-------------------------------------------------------------------
resource "aws_apigatewayv2_api" "apigatewayv2-api-http" {
  name          = "${local.default_name}-rest-api"
  description   = "rest api2 project"
  protocol_type = "HTTP"
  #route_key                  = "GET /hello"
  api_key_selection_expression = "$request.header.x-api-key"
  route_selection_expression   = "$request.method $request.path"

  tags = {
    Name = "${local.default_name}-api-rest"
  }
}
#-------------------------------------------------------------------
#terraform import aws_apigatewayv2_api.example aabbccddee
#step 2
#-------------------------------------------------------------------
resource "aws_apigatewayv2_stage" "apigatewayv2-stage-http" {
  name        = "test"
  description = "stage for production"

  api_id          = aws_apigatewayv2_api.apigatewayv2-api-http.id
  auto_deploy     = true
  stage_variables = {}

  tags = {
    Name = "${local.default_name}-prod-stage"
  }
}
#-------------------------------------------------------------------
resource "aws_apigatewayv2_integration" "apigatewayv2-integration-http" {
  api_id           = aws_apigatewayv2_api.apigatewayv2-api-http.id
  integration_type = "AWS_PROXY"

  connection_type = "INTERNET"

  description        = "Lambda integration with api http"
  integration_method = "POST"
  integration_uri    = aws_lambda_function.lambda-function.invoke_arn

  passthrough_behavior = "WHEN_NO_MATCH"
  timeout_milliseconds = 29000
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_route" "apigatewayv2-route-http" {
  api_id    = aws_apigatewayv2_api.apigatewayv2-api-http.id
  route_key = "ANY /hello"

  authorization_type = "NONE"
  #authorizer_id       = aws_apigatewayv2_authorizer.apigatewayv2-authorizer.id
  target = "integrations/${aws_apigatewayv2_integration.apigatewayv2-integration-http.id}"
}
#-------------------------------------------------------------------
resource "aws_apigatewayv2_deployment" "apigatewayv2-deployment-http" {
  api_id = aws_apigatewayv2_route.apigatewayv2-route-http.api_id

  description = "apigatewayv2 deployment"

  lifecycle {
    create_before_destroy = true
  }
}
#-------------------------------------------------------------------
output "api-endpoint-http" {
  description = "The URI of the API"
  value       = aws_apigatewayv2_api.apigatewayv2-api-http.api_endpoint
}
#-------------------------------------------------------------------