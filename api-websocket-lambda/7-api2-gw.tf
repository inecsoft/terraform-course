#-------------------------------------------------------------------
#Step 1 Create an API + integration(can be multiple integrations) with lambda
#-------------------------------------------------------------------
resource "aws_apigatewayv2_api" "apigatewayv2-api" {
  name                       = "${local.default_name}-websocket-api"
  description                = "Web socket api2 project"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}
#-------------------------------------------------------------------------------------------------------------------
#Step 2 predefine routes and custom routes  ""
#-------------------------------------------------------------------------------------------------------------------
#[for i in toset([ 1,2,3 ]) : format("$%s",i)]
resource "aws_apigatewayv2_route" "apigatewayv2-route-connect" {
  api_id              = aws_apigatewayv2_api.apigatewayv2-api.id
  route_key           = "$connect"
  authorization_type  = "NONE"
  #authorizer_id       = aws_apigatewayv2_authorizer.apigatewayv2-authorizer.id
  target              = aws_lambda_function.lambda-function-connect.function_name
}
#-------------------------------------------------------------------
resource "aws_apigatewayv2_route" "apigatewayv2-route-disconnect" {
  api_id              = aws_apigatewayv2_api.apigatewayv2-api.id
  route_key           = "$disconnect"
  authorization_type  = "NONE"
  #authorizer_id       = aws_apigatewayv2_authorizer.apigatewayv2-authorizer.id
  target              = aws_lambda_function.lambda-function-disconnect.function_name
}
#-------------------------------------------------------------------
resource "aws_apigatewayv2_route" "apigatewayv2-route-default" {
  api_id              = aws_apigatewayv2_api.apigatewayv2-api.id
  route_key           = "$default"
  authorization_type  = "NONE"
  #authorizer_id       = aws_apigatewayv2_authorizer.apigatewayv2-authorizer.id
  target              = aws_lambda_function.lambda-function-default.function_name
}
#-------------------------------------------------------------------
resource "aws_apigatewayv2_integration" "apigatewayv2-integration" {
  api_id                    = aws_apigatewayv2_api.apigatewayv2-api.id
  description               = "Lambda integration with api websocket"
  integration_type          = "AWS_PROXY"
  
  #The type of the network connection to the integration endpoint.
  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  
  integration_method        = "POST"
  #The URI of the Lambda function for a Lambda proxy integration, when integration_type is AWS_PROXY
  integration_uri           = aws_lambda_function.lambda-function-connect.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}
#-------------------------------------------------------------------------------------------------------------------
#There are two types of Lambda authorizers:

# A token-based Lambda authorizer (also called a TOKEN authorizer) receives the caller's identity in a bearer token, such as a JSON Web Token (JWT) or an OAuth token.

# A request parameter-based Lambda authorizer (also called a REQUEST authorizer) receives the caller's identity in a combination of headers, query string parameters, stageVariables, and $context variables.

# For WebSocket APIs, only request parameter-based authorizers are supported.
#-------------------------------------------------------------------
resource "aws_apigatewayv2_authorizer" "apigatewayv2-authorizer" {
  name             = "${local.default_name}-auth"
  api_id           = aws_apigatewayv2_api.apigatewayv2-api.id
  authorizer_type  = "REQUEST"
  authorizer_uri   = aws_lambda_function.lambda-function-auth.invoke_arn
  identity_sources = ["route.request.header.Auth"]

  #identity_sources = ["method.request.header.Authorization"]
  
}
#-------------------------------------------------------------------

# resource "aws_apigatewayv2_route" "apigatewayv2-route-auth" {
#   api_id              = aws_apigatewayv2_api.apigatewayv2-api.id
#   route_key           = "$default"

#   authorization_type  = "CUSTOM"
#   authorizer_id       = aws_apigatewayv2_authorizer.apigatewayv2-authorizer.id
#   target              = aws_lambda_function.lambda-function-auth.function_name
# }
#-------------------------------------------------------------------
resource "aws_apigatewayv2_stage" "apigatewayv2_stage" {
  api_id = aws_apigatewayv2_api.apigatewayv2-api.id
  description = "stage for production"
  name   = "prod"

  tags = {
    Name =  "${local.default_name}-prod-stage"
  }
}
#-------------------------------------------------------------------
resource "aws_apigatewayv2_deployment" "apigatewayv2-deployment" {
  api_id      = aws_apigatewayv2_route.apigatewayv2-route-connect.api_id
  description = "apigatewayv2 deployment"

  lifecycle {
    create_before_destroy = true
  }
}
#-------------------------------------------------------------------
output "api-endpoint" {
  description = "The URI of the API"
  value       = aws_apigatewayv2_api.apigatewayv2-api.api_endpoint 
}
#-------------------------------------------------------------------