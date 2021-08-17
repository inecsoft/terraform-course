#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_request_validator" "api-gateway-request-validator-order" {
  name                        = "${local.default_name}-request-validator-order"
  rest_api_id                 = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  validate_request_body       = false
  validate_request_parameters = false
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_request_validator" "api-gateway-request-validator-order-id" {
  name                        = "${local.default_name}-request-validator-order-id"
  rest_api_id                 = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  validate_request_body       = false
  validate_request_parameters = false
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
resource "aws_api_gateway_method" "api-gateway-method-order" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "POST"
  rest_api_id        = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-order.id
  api_key_required   = true

  request_validator_id = aws_api_gateway_request_validator.api-gateway-request-validator-order-id.id

  # request_parameters = {
  #   "method.request.querystring.orderId" = true
  # }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-order-id" {
  authorization      = "NONE"
  request_parameters = {}
  http_method        = "GET"
  rest_api_id        = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id        = aws_api_gateway_resource.api-gateway-resource-order-id.id
  api_key_required   = true

  request_validator_id = aws_api_gateway_request_validator.api-gateway-request-validator-order-id.id

  # request_parameters = {
  #   "method.request.querystring.orderId" = true
  # }

}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_settings" "api-gateway-method-settings-order" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  stage_name  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  method_path = "${aws_api_gateway_resource.api-gateway-resource-order.path_part}/${aws_api_gateway_method.api-gateway-method-order.http_method}"

  settings {
    cache_data_encrypted = false
    cache_ttl_in_seconds = 300
    caching_enabled      = true
    data_trace_enabled   = false
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
resource "aws_api_gateway_integration" "api-gateway-integration-order" {
  rest_api_id             = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id             = aws_api_gateway_resource.api-gateway-resource-order.id
  http_method             = aws_api_gateway_method.api-gateway-method-order.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  content_handling        = "CONVERT_TO_TEXT"
  passthrough_behavior    = "WHEN_NO_MATCH"
  cache_key_parameters    = []
  request_parameters      = {}
  request_templates       = {}
  uri                     = aws_lambda_function.lambda-function-getorderstatus.invoke_arn
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_method_settings" "api-gateway-method-settings-order-id" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  stage_name  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  method_path = "${aws_api_gateway_resource.api-gateway-resource-order-id.path_part}/${aws_api_gateway_method.api-gateway-method-order-id.http_method}"

  settings {
    cache_data_encrypted = false
    cache_ttl_in_seconds = 300
    caching_enabled      = true
    data_trace_enabled   = false
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
resource "aws_api_gateway_integration" "api-gateway-integration-order-id" {
  rest_api_id             = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id             = aws_api_gateway_resource.api-gateway-resource-order-id.id
  http_method             = aws_api_gateway_method.api-gateway-method-order-id.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = aws_lambda_function.lambda-function-getorderstatus.invoke_arn
  cache_key_parameters    = []
  content_handling        = "CONVERT_TO_TEXT"
  passthrough_behavior    = "WHEN_NO_MATCH"
  request_parameters      = {}
  request_templates = {
    # "application/json"  = "{ 'orderId': $input.params('id')}"
  }
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
    "method.response.header.Access-Control-Allow-Headers" = false,
    "method.response.header.Access-Control-Allow-Methods" = false,
    "method.response.header.Access-Control-Allow-Origin"  = false
  }

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order-id.id
  http_method = aws_api_gateway_method.api-gateway-method-order-id.http_method
  status_code = "200"
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-order" {
  # response_parameters = {
  #   "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
  #   "method.response.header.Access-Control-Allow-Methods" = "'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT'",
  #   "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  # }

  response_parameters = {
    # "method.response.header.X-Some-Header" = "'method.response.header.X-Some-Other-Header'",
  }

  response_templates = {
    "application/json" = ""
    #     "application/xml" = <<EOF
    # #set($inputRoot = $input.path('$'))
    # <?xml version="1.0" encoding="UTF-8"?>
    # <message>
    #     $inputRoot.body
    # </message>
    # EOF
  }

  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order.id
  http_method = aws_api_gateway_method.api-gateway-method-order.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200-order.status_code
  #content_handling = "CONVERT_TO_TEXT"
  #selection_pattern =
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-order-id" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-order-id.id
  http_method = aws_api_gateway_method.api-gateway-method-order-id.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-200-order-id.status_code
  response_parameters = {
    # "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'",
    # "method.response.header.Access-Control-Allow-Methods" = "'GET,POST'",
    # "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
  response_templates = {
    "application/json" = ""
  }

}
#-----------------------------------------------------------------------------