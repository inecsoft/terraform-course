#-----------------------------------------------------------------------------
resource "aws_api_gateway_rest_api" "api-gateway-rest-api" {
  name        = "${local.default_name}-RestApi"
  description = "Terraform Serverless REST Application"

  # #AUTHORIZER or HEADER
  # api_key_source   = "HEADER"
  # minimum_compression_size = -1

  #types "EDGE", "REGIONAL", "PRIVATE"
  endpoint_configuration {
    types = [
      "REGIONAL",
    ]
    #VPCEndpoints can only be specified with PRIVATE apis.   
    #vpc_endpoint_ids = [module.vpc.vpc_id]
  }

  tags = {
    Name = "${local.default_name}-restapi"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource" {
  rest_api_id = aws_api_gateway_rest_api.api-gateway-rest-api.id
  parent_id   = aws_api_gateway_rest_api.api-gateway-rest-api.root_resource_id
  path_part   = "hello"
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method" {
  rest_api_id   = aws_api_gateway_rest_api.api-gateway-rest-api.id
  resource_id   = aws_api_gateway_resource.api-gateway-resource.id
  http_method   = "GET"
  authorization = "NONE"
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-lambda" {
  rest_api_id             = aws_api_gateway_rest_api.api-gateway-rest-api.id
  resource_id             = aws_api_gateway_resource.api-gateway-resource.id
  http_method             = aws_api_gateway_method.api-gateway-method.http_method
  connection_type         = "INTERNET"
  integration_http_method = "POST"

  passthrough_behavior = "WHEN_NO_MATCH"
  timeout_milliseconds = 29000
  request_parameters   = {}
  request_templates    = {}
  cache_key_parameters = []
  type                 = "AWS_PROXY"
  uri                  = aws_lambda_function.lambda-function.invoke_arn
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-200" {
  rest_api_id = aws_api_gateway_rest_api.api-gateway-rest-api.id
  resource_id = aws_api_gateway_resource.api-gateway-resource.id
  http_method = aws_api_gateway_method.api-gateway-method.http_method
  status_code = "200"


  #Response Headers for 200
  #response_parameters = { "method.response.header.X-Some-Header" = true }

  #Response Body for 200
  response_models = {
    "application/json" = "Empty"
  }

}
#----------------------------------------------------------------------------------------
#REST-API-ID/RESOURCE-ID/HTTP-METHOD/STATUS-CODE
#terraform import aws_api_gateway_integration_response.api-gateway-integration-response tovjyapnzc/0c2oxptla8/GET/200
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response" {
  rest_api_id = aws_api_gateway_rest_api.api-gateway-rest-api.id
  resource_id = aws_api_gateway_resource.api-gateway-resource.id
  http_method = aws_api_gateway_method.api-gateway-method.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200.status_code

  selection_pattern = "-"


  #A map of response parameters that can be read from the backend response
  # response_parameters = { "method.response.header.X-Some-Header" = "integration.response.header.X-Some-Other-Header" }
  #A map specifying the templates used to transform the integration response body
  # Transforms the backend JSON response to XML
  response_templates = {
    "application/json" = ""
  }
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  depends_on  = [aws_api_gateway_integration.api-gateway-integration-lambda]
  rest_api_id = aws_api_gateway_rest_api.api-gateway-rest-api.id
  stage_name  = var.stage_name
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_stage" "api-gateway-stage" {
  stage_name    = "prod"
  rest_api_id   = aws_api_gateway_rest_api.api-gateway-rest-api.id
  deployment_id = aws_api_gateway_deployment.api-gateway-deployment.id

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.cloudwatch-log-group-api.arn
    #$context.requestId or $context.extendedRequestId 
    format = "$context.requestId"
  }

  tags = {
    Name = "${local.default_name}-api-gateway-stage"
  }
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_base_path_mapping" "api-gateway-base-path-mapping" {
  api_id      = aws_api_gateway_rest_api.api-gateway-rest-api.id
  stage_name  = aws_api_gateway_deployment.api-gateway-deployment.stage_name
  domain_name = aws_api_gateway_domain_name.api-gateway-domain-name.domain_name

  #Path segment that must be prepended to the path when accessing the API via this mapping.
  #If omitted, the API is exposed at the root of the given domain.
  #base_path = "/"
}
#----------------------------------------------------------------------------------------
#By default any two AWS services have no access to one another, until access is explicitly granted.
#For Lambda functions, access is granted using the aws_lambda_permission resource
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "lambda-permission-apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.api-gateway-rest-api.execution_arn}/*/${aws_api_gateway_method.api-gateway-method.http_method}${aws_api_gateway_resource.api-gateway-resource.path}"
}
#----------------------------------------------------------------------------------------
output "api-gateway-rest-api-id" {
  value = aws_api_gateway_rest_api.api-gateway-rest-api.id
}
#----------------------------------------------------------------------------------------
output "api-gateway-stage-invoke-url" {
  description = "description of the rest api invoke-url"
  value       = aws_api_gateway_stage.api-gateway-stage.invoke_url
}
#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------

