#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_request_validator" "api-gateway-request-validator-shoes" {
  name                        = "${local.default_name}-request-validator-shoes"
  rest_api_id                 = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  validate_request_body       = false
  validate_request_parameters = false
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-shoes" {
  parent_id   = aws_api_gateway_rest_api.rest-api-acme-shoes.root_resource_id
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  path_part   = "shoes"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-shoes" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "GET"
  rest_api_id        = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-shoes.id
  api_key_required   = false

  request_validator_id = aws_api_gateway_request_validator.api-gateway-request-validator-shoes.id

  # request_parameters = {
  #   "method.request.querystring.orderId" = true
  # }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_settings" "api-gateway-method-settings-shoes" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  stage_name  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  method_path = "${aws_api_gateway_resource.api-gateway-resource-shoes.path_part}/${aws_api_gateway_method.api-gateway-method-shoes.http_method}"

  settings {
    cache_data_encrypted = false
    cache_ttl_in_seconds = 300
    caching_enabled      = true
    data_trace_enabled   = true
    #OFF, ERROR, and INFO.
    logging_level                              = "INFO"
    metrics_enabled                            = true
    require_authorization_for_cache_control    = true
    throttling_burst_limit                     = 500
    throttling_rate_limit                      = 1000
    unauthorized_cache_control_header_strategy = "SUCCEED_WITH_RESPONSE_HEADER"
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-shoes" {
  rest_api_id             = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id             = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method             = aws_api_gateway_method.api-gateway-method-shoes.http_method
  integration_http_method = "POST"
  timeout_milliseconds    = 29000
  type                    = "AWS"
  cache_key_parameters    = []
  content_handling        = "CONVERT_TO_TEXT"
  passthrough_behavior    = "WHEN_NO_MATCH"

  uri                = aws_lambda_function.lambda-function-getinventory.invoke_arn
  request_parameters = {}
  request_templates  = {}
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-200-shoes" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method = aws_api_gateway_method.api-gateway-method-shoes.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Cache-Control"               = false
    "method.response.header.Pragma"                      = false
    "method.response.header.X-Content-Type-Options"      = false
    "method.response.header.X-XSS-Protection"            = false
    "method.response.header.Strict-Transport-Security"   = false
    "method.response.header.X-Frame-Options"             = false
    "method.response.header.Content-Security-Policy"     = false
    "method.response.header.Referrer-Policy"             = false
    "method.response.header.Access-Control-Allow-Origin" = false
  }

}
#------------------------------------------------------------------------------------------------------------
#cors
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-shoes" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-shoes.id
  http_method = aws_api_gateway_method.api-gateway-method-shoes.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200-shoes.status_code

  #content_handling = "CONVERT_TO_TEXT"

  response_parameters = {
    # "method.response.header.Cache-Control"               = "'no-cache, no-store, must-revalidate'"
    # "method.response.header.Pragma"                      = "'no-cache'"
    # "method.response.header.X-Content-Type-Options"      = "'nosniff'"
    # "method.response.header.X-XSS-Protection"            = "'1; mode=block'"
    # "method.response.header.Strict-Transport-Security"   = "'max-age=63072000; includeSubDomains; preload'"
    # "method.response.header.X-Frame-Options"             = "'DENY'"
    # "method.response.header.Content-Security-Policy"     = "'default-src 'none'; frame-ancestors 'none''"
    # "method.response.header.Referrer-Policy"             = "'no-referrer'"
    # "method.response.header.Access-Control-Allow-Origin" = "'*'"
  }

  response_templates = {
    "application/json" = ""
  }

}
#-----------------------------------------------------------------------------

