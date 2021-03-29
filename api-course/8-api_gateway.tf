#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_rest_api" "rest-api" {
  name        = "${local.default_name}-ACME-Shoes-rest-api"
  description = "Terraform Serverless Application Example ${local.default_name}-ACME-Shoes-rest-api"
  
  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "${local.default_name}-ACME-Shoes-rest-api"
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-shoes" {
  parent_id   = aws_api_gateway_rest_api.rest-api.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  path_part   = "shoes"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "GET"
  rest_api_id        = aws_api_gateway_rest_api.rest-api.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-shoes.id
  
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration" {
  rest_api_id              = aws_api_gateway_rest_api.rest-api.id
  resource_id              = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method              = aws_api_gateway_method.api-gateway-method.http_method
  integration_http_method  = "POST"
  type                     = "AWS_PROXY"
  uri                      = aws_lambda_function.lambda-function.invoke_arn
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-200" {
  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method = aws_api_gateway_method.api-gateway-method.http_method
  status_code = "200"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response" {
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  response_templates = {}

  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method = aws_api_gateway_method.api-gateway-method.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200.status_code
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest-api.id

  triggers = {

    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api-gateway-resource-shoes.id,
      aws_api_gateway_method.api-gateway-method.id,
      aws_api_gateway_integration.api-gateway-integration.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_stage" "api-gateway-stage-dev" {
  deployment_id = aws_api_gateway_deployment.api-gateway-deployment.id
  rest_api_id   = aws_api_gateway_rest_api.rest-api.id
  stage_name    = "dev"
  description   = "${local.default_name}-ACME-Shoes-rest-api stage dev"

  cache_cluster_enabled = true
  #Allowed values include 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118 and 237
  cache_cluster_size    = 0.5

  tags = {
    Name = "${local.default_name}-api-gateway-stage-dev"
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_method_settings" "api-gateway-method-settings" {
  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  stage_name  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  method_path = "*/*"
  
  settings {
    # cache_data_encrypted                       = (known after apply)
    cache_ttl_in_seconds                       = 300
    caching_enabled                            = true
    # data_trace_enabled                         = (known after apply)
    #OFF, ERROR, and INFO.
    logging_level                              = "ERROR"
    metrics_enabled                            = true
    # require_authorization_for_cache_control    = (known after apply)
    throttling_burst_limit                     = 500
    throttling_rate_limit                      = 1000
    # unauthorized_cache_control_header_strategy = (known after apply)
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_usage_plan" "api-gateway-usage-plan" {
  name         = "${local.default_name}-api-GW-usage-plan"
  description  = "${local.default_name}-api-GW-usage-plan"
  product_code = "MYCODE"

  api_stages {
    api_id = aws_api_gateway_rest_api.rest-api.id
    stage  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  }

  # api_stages {
  #   api_id = aws_api_gateway_rest_api.rest-api.id
  #   stage  = aws_api_gateway_stage.api-gateway-stage-prod.stage_name
  # }

  quota_settings {
    limit  = 20
    offset = 2
    period = "WEEK"
  }

  throttle_settings {
    burst_limit = 500
    rate_limit  = 1000
  }

  tags = {
    Name = "${local.default_name}-api-gateway-usage-plan"
  }
}
#-----------------------------------------------------------------------------
#In order to test the created API you will need to access its test URL
#-----------------------------------------------------------------------------
output "base_url" {
  value = aws_api_gateway_deployment.api-gateway-deployment.invoke_url
}
#-----------------------------------------------------------------------------

