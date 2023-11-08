#-----------------------------------------------------------------------------
#testing the api gateway
#-------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-ping" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  parent_id   = aws_api_gateway_rest_api.rest-api-proxy.root_resource_id
  path_part   = "ping"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-ping" {
  rest_api_id   = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id   = aws_api_gateway_resource.api-gateway-resource-ping.id
  http_method   = "GET"
  authorization = "NONE"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-ping" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-ping.id
  http_method = aws_api_gateway_method.api-gateway-method-ping.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = <<EOF
  {"statusCode": 200}

EOF

  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-responseping-ping-200" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-ping.id
  http_method = aws_api_gateway_method.api-gateway-method-ping.http_method
  status_code = "200"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-ping" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-ping.id
  http_method = aws_api_gateway_method.api-gateway-method-ping.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-responseping-ping-200.status_code

  # Transforms the backend JSON response to XML
  response_templates = {
    "application/json" = <<EOF
#set($inputRoot = $input.path('$'))
{
  "pong" : "OK"
}
EOF

  }
}
#-----------------------------------------------------------------------------