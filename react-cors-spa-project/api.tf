resource "aws_api_gateway_rest_api" "simple_api" {
  description = "A simple CORS compliant API"
  name = "SimpleAPI-dev"
  endpoint_configuration {
    types = [
      "REGIONAL"
    ]
  }
}

resource "aws_api_gateway_resource" "simple_api_resource" {
  depends_on = [ aws_api_gateway_rest_api.simple_api ]
  parent_id = aws_api_gateway_rest_api.simple_api.root_resource_id
  path_part = "hello"
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
}


resource "aws_api_gateway_method" "hello_apiget_method" {
  rest_api_id   = aws_api_gateway_rest_api.simple_api.id
  resource_id   = aws_api_gateway_resource.simple_api_resource.id
  http_method   = "GET"
  authorization = "NONE"
}


resource "aws_api_gateway_integration" "api-gateway-integration-simple_api" {
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
  resource_id = aws_api_gateway_resource.simple_api_resource.id
  http_method = aws_api_gateway_method.hello_apiget_method.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = <<EOF
  {"statusCode": 200}
  
EOF

  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_method_response" "api-gateway-method-response-simple_api-200" {
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
  resource_id = aws_api_gateway_resource.simple_api_resource.id
  http_method = aws_api_gateway_method.hello_apiget_method.http_method
  status_code = "200"

  # response_parameters = {
  #   "method.response.header.Access-Control-Allow-Headers" = true,
  #   "method.response.header.Access-Control-Allow-Methods" = true,
  #   "method.response.header.Access-Control-Allow-Origin" = true
  # }

  response_models = {
    "application/json" =   "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
  }
  
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-simple_api" {
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
  resource_id = aws_api_gateway_resource.simple_api_resource.id
  http_method = aws_api_gateway_method.hello_apiget_method.http_method
  status_code = aws_api_gateway_method_response.api-gateway-method-response-simple_api-200.status_code
  selection_pattern   = "200"
  #content_handling = "CONVERT_TO_TEXT"

  # Transforms the backend JSON response to XML
  response_templates = {
    "application/json" = <<EOF
{
  "message": "Hello World!"
}
EOF

  }
  
  response_parameters = { 
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
  

   // CF Property(Integration) = {
  //   Type = "MOCK"
  //   PassthroughBehavior = "WHEN_NO_MATCH"
  //   RequestTemplates = {
  //     application/json = "{
  //  "statusCode": 200
  // }"
  //   }
  //   IntegrationResponses = [
  //     {
  //       StatusCode = 200
  //       SelectionPattern = 200
  //       ResponseParameters = {
  //         method.response.header.Access-Control-Allow-Origin = "'*'"
  //       }
  //       ResponseTemplates = {
  //         application/json = "{"message": "Hello World!"}"
  //       }
  //     }
  //   ]
  // }
  // CF Property(MethodResponses) = [
  //   {
  //     StatusCode = 200
  //     ResponseParameters = {
  //       method.response.header.Access-Control-Allow-Origin = True
  //     }
  //     ResponseModels = {
  //       application/json = "Empty"
  //     }
  //   }
  // ]
}


resource "aws_api_gateway_stage" "api-gateway-stage-dev" {
  deployment_id = aws_api_gateway_deployment.api-gateway-deployment.id
  rest_api_id   = aws_api_gateway_rest_api.simple_api.id

  stage_name = "v1"

  description = "A simple CORS compliant API"

  cache_cluster_enabled = false
  #Allowed values include 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118 and 237
  cache_cluster_size = 0.5

  /* depends_on = [aws_cloudwatch_log_group.cw-log-gp-api-gw]
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.cw-log-gp-api-gw.arn
    #destination_arn = "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:log-group:API-Gateway-Access-Logs/${aws_api_gateway_rest_api.simple_api.name}"
    format = "$context.identity.sourceIp,$context.identity.caller,$context.identity.user,$context.identity.apiKeyId,$context.identity.userAgent,$context.requestTime,$context.httpMethod,$context.resourcePath,$context.protocol,$context.status,$context.wafResponseCode,$context.responseLength,$context.requestId,$context.extendedRequestId"
  } */

}

resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  depends_on = [ aws_s3_bucket.logging_bucket, aws_api_gateway_method.hello_apiget_method ]
  rest_api_id = aws_api_gateway_rest_api.simple_api.id

  # triggers = {

  #   redeployment = sha1(jsonencode([
  #     aws_api_gateway_resource.api-gateway-resource-shoes.id,
  #     aws_api_gateway_method.api-gateway-method-shoes.id,
  #     aws_api_gateway_integration.api-gateway-integration-shoes.id,
  #     aws_api_gateway_resource.api-gateway-resource-order.id,
  #     aws_api_gateway_method.api-gateway-method-order.id,
  #     aws_api_gateway_integration.api-gateway-integration-order.id,
  #     aws_api_gateway_resource.api-gateway-resource-order-id.id,
  #     aws_api_gateway_method.api-gateway-method-order-id.id,
  #     aws_api_gateway_integration.api-gateway-integration-order-id.id,
  #     aws_api_gateway_resource.api-gateway-resource-ping.id,
  #     aws_api_gateway_method.api-gateway-method-ping.http_method,
  #     aws_api_gateway_integration.api-gateway-integration-ping.id,
  #   ]))
  # }

  variables = {
    # overide_api    = var.overide_api
    # root_api       = filebase64sha256("${path.module}/root.tf")
    api_gateway        = filebase64sha256("api.tf")

  }

  lifecycle {
    create_before_destroy = true
  }
}


#-----------------------------------------------------------------------------
#testing the api gateway
#-------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "api-gateway-resource-ping" {
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
  parent_id   = aws_api_gateway_rest_api.simple_api.root_resource_id
  path_part   = "ping"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_method" "api-gateway-method-ping" {
  rest_api_id   = aws_api_gateway_rest_api.simple_api.id
  resource_id   = aws_api_gateway_resource.api-gateway-resource-ping.id
  http_method   = "GET"
  authorization = "NONE"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_integration" "api-gateway-integration-ping" {
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
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
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
  resource_id = aws_api_gateway_resource.api-gateway-resource-ping.id
  http_method = aws_api_gateway_method.api-gateway-method-ping.http_method
  status_code = "200"
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_integration_response" "api-gateway-integration-response-ping" {
  rest_api_id = aws_api_gateway_rest_api.simple_api.id
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

/* output "api_endpoint" {
  value = "https://${aws_api_gateway_rest_api.simple_api.arn}.execute-api.${data.aws_region.current.name}.amazonaws.com/v1/hello"
} */

output "api_endpoint_url" {
  value = "${aws_api_gateway_stage.api-gateway-stage-dev.invoke_url}/hello"
}

output "api_DomainName" {
  value = "${aws_api_gateway_rest_api.simple_api.id}.execute-api.${data.aws_region.current.name}.amazonaws.com"
}