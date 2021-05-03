#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_rest_api" "rest-api-acme-shoes" {
  name        = "${local.default_name}-${var.api_name}"
  description = "Terraform Serverless Application Example ${local.default_name}-${var.api_name}"
  
  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "${local.default_name}-${var.api_name}"
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_domain_name" "api-gateway-domain-name" {
  domain_name              = "${local.default_name}-${var.api_name}.inecsoft.co.uk"
  regional_certificate_arn = aws_acm_certificate_validation.acm-certificate-validation.certificate_arn
  #TLS_1_0 and TLS_1_2
  security_policy          = "TLS_1_2"

  #EDGE or REGIONAL
  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "${local.default_name}-api-gateway-domain-name"
  }
}
resource "aws_route53_record" "route53-record" {
  allow_overwrite   = true
  name              = aws_api_gateway_domain_name.api-gateway-domain-name.domain_name
  type              = "A"
  zone_id           = aws_route53_zone.example.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.api-gateway-domain-name.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.api-gateway-domain-name.cloudfront_zone_id
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-shoes" {
  parent_id   = aws_api_gateway_rest_api.rest-api-acme-shoes.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  path_part   = "shoes"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-order" {
  parent_id   = aws_api_gateway_rest_api.rest-api-acme-shoes.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  path_part   = "order"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-order-id" {
  parent_id   = aws_api_gateway_resource.api-gateway-resource-order.id
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  path_part   = "{id}"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-shoes" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "GET"
  rest_api_id        = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-shoes.id
  
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-order" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "POST"
  rest_api_id        = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-order.id
  
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-order-id" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "GET"
  rest_api_id        = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-order-id.id
  
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-shoes" {
  rest_api_id              = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id              = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method              = aws_api_gateway_method.api-gateway-method-shoes.http_method
  integration_http_method  = "POST"
  type                     = "AWS_PROXY"
  uri                      = aws_lambda_function.lambda-function-getinventory.invoke_arn
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-order" {
  rest_api_id              = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id              = aws_api_gateway_resource.api-gateway-resource-order.id
  http_method              = aws_api_gateway_method.api-gateway-method-order.http_method
  integration_http_method  = "POST"
  type                     = "AWS_PROXY"
  uri                      = aws_lambda_function.lambda-function-getorderstatus.invoke_arn
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-order-id" {
  rest_api_id              = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id              = aws_api_gateway_resource.api-gateway-resource-order-id.id
  http_method              = aws_api_gateway_method.api-gateway-method-order-id.http_method
  integration_http_method  = "POST"
  type                     = "AWS_PROXY"
  uri                      = aws_lambda_function.lambda-function-getorderstatus.invoke_arn
  request_templates = {
    "application/json" = "Empty"
    "application/xml"  = "{ 'orderId': $input.params('id')}"
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-200-shoes" {
  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method = aws_api_gateway_method.api-gateway-method-shoes.http_method
  status_code = "200"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-200-order" {
  response_models = {
    "application/json" = "Empty"
  }

  # response_parameters = {
  #   "method.response.header.Access-Control-Allow-Headers" = true,
  #   "method.response.header.Access-Control-Allow-Methods" = true,
  #   "method.response.header.Access-Control-Allow-Origin" = true
  # }

  response_parameters = {
    "method.response.header.X-Some-Header" = true
  }

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order.id
  http_method = aws_api_gateway_method.api-gateway-method-order.http_method
  status_code = "200"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-200-order-id" {
  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin" = true
  }

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order-id.id
  http_method = aws_api_gateway_method.api-gateway-method-order-id.http_method
  status_code = "200"
}
#------------------------------------------------------------------------------------------------------------
#cors
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-shoes" {
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  response_templates = {}

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method = aws_api_gateway_method.api-gateway-method-shoes.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200-shoes.status_code
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-order" {
  # response_parameters = {
  #   "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
  #   "method.response.header.Access-Control-Allow-Methods" = "'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'",
  #   "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  # }
  
  response_parameters = {
    "method.response.header.X-Some-Header" = "'method.response.header.X-Some-Other-Header'",
  }

  response_templates = {
    "application/xml" = <<EOF
#set($inputRoot = $input.path('$'))
<?xml version="1.0" encoding="UTF-8"?>
<message>
    $inputRoot.body
</message>
EOF
}

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order.id
  http_method = aws_api_gateway_method.api-gateway-method-order.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200-order.status_code
  content_handling = "CONVERT_TO_TEXT"
  #selection_pattern =
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-order-id" {
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  response_templates = {}

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order-id.id
  http_method = aws_api_gateway_method.api-gateway-method-order-id.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200-order-id.status_code
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id

  triggers = {

    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api-gateway-resource-shoes.id,
      aws_api_gateway_method.api-gateway-method-shoes.id,
      aws_api_gateway_integration.api-gateway-integration-shoes.id,
      aws_api_gateway_resource.api-gateway-resource-order.id,
      aws_api_gateway_method.api-gateway-method-order.id,
      aws_api_gateway_integration.api-gateway-integration-order.id,
      aws_api_gateway_resource.api-gateway-resource-order-id.id,
      aws_api_gateway_method.api-gateway-method-order-id.id,
      aws_api_gateway_integration.api-gateway-integration-order-id.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_stage" "api-gateway-stage-dev" {
  deployment_id = aws_api_gateway_deployment.api-gateway-deployment.id
  rest_api_id   = aws_api_gateway_rest_api.rest-api-acme-shoes.id

  stage_name    = var.stage_name

  description   = "${local.default_name}-ACME-Shoes-rest-api stage dev"

  cache_cluster_enabled = false
  #Allowed values include 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118 and 237
  cache_cluster_size    = 0.5

  depends_on = [ aws_cloudwatch_log_group.cw-log-gp-api-gw ]
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.cw-log-gp-api-gw.arn
    #destination_arn = "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:log-group:API-Gateway-Access-Logs/${aws_api_gateway_rest_api.rest-api-acme-shoes.name}"
    format          = "$context.identity.sourceIp,$context.identity.caller,$context.identity.user,$context.identity.apiKeyId,$context.identity.userAgent,$context.requestTime,$context.httpMethod,$context.resourcePath,$context.protocol,$context.status,$context.wafResponseCode,$context.responseLength,$context.requestId,$context.extendedRequestId"
  }
  tags = {
    Name = "${local.default_name}-api-gateway-stage-dev"
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_method_settings" "api-gateway-method-settings-shoes" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
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

  # settings {
  #   metrics_enabled = true
  #   logging_level   = "INFO"
  #   cache_data_encrypted                       = false
  #   cache_ttl_in_seconds                       = 300 
  #   caching_enabled                            = false
  #   data_trace_enabled                         = false 
  #   require_authorization_for_cache_control    = true 
  #   throttling_burst_limit                     = 5000 
  #   throttling_rate_limit                      = 10000 
  #   unauthorized_cache_control_header_strategy = "SUCCEED_WITH_RESPONSE_HEADER" 
  # }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_usage_plan" "api-gateway-usage-plan" {
  name         = "${local.default_name}-api-GW-usage-plan"
  description  = "${local.default_name}-api-GW-usage-plan"
  product_code = "MYCODE"

  api_stages {
    api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
    stage  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  }

  # api_stages {
  #   api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  #   stage  = aws_api_gateway_stage.api-gateway-stage-prod.stage_name
  # }

  quota_settings {
    limit  = 100
    offset = 0
    period = "DAY"
  }

  throttle_settings {
    burst_limit = 10
    rate_limit  = 5
  }

  tags = {
    Name = "${local.default_name}-api-gateway-usage-plan"
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_api_key" "api-gateway-api-key" {
  name = "api-key"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_usage_plan_key" "api-gateway-usage-plan-key" {
  key_id        = aws_api_gateway_api_key.api-gateway-api-key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.api-gateway-usage-plan.id
}
#-----------------------------------------------------------------------------
#In order to test the created API you will need to access its test URL
#-----------------------------------------------------------------------------
output "api-gateway-invoke-url" {
  value = aws_api_gateway_deployment.api-gateway-deployment.invoke_url
}
#-----------------------------------------------------------------------------

