#-----------------------------------------------------------------------------
resource "aws_api_gateway_rest_api" "rest-api-proxy" {
  name        = "RestApi"
  description = "Terraform Serverless Application nextjs"

  # #AUTHORIZER or HEADER
  # api_key_source   = "HEADER"
  # minimum_compression_size = -1

  # endpoint_configuration {
  #   types = [
  #     "EDGE",
  #   ]
  # #VPCEndpoints can only be specified with PRIVATE apis.
  # #vpc_endpoint_ids = [module.vpc.vpc_id]
  # }

  tags = {
    Name = "restapi"
  }
}
#-----------------------------------------------------------------------------
#In order to test the created API you will need to access its test URL
#-----------------------------------------------------------------------------
output "rest-api-proxy-base_url-test" {
  value = aws_api_gateway_deployment.aws_api_gateway_deployment_test.invoke_url
}
#-----------------------------------------------------------------------------

output "rest-api-proxy-base_url-prod" {
  value = aws_api_gateway_deployment.aws_api_gateway_deployment_prod.invoke_url
}

#----------------------------------------------------------------------------------------
#All incoming requests to API Gateway must match with a configured resource and
#method in order to be handled.

#The special path_part value "{proxy+}" activates proxy behavior,
#which means that this resource will match any request path.
#this means that all incoming requests will match this resource.
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  parent_id   = aws_api_gateway_rest_api.rest-api-proxy.root_resource_id
  path_part   = "{proxy+}"
}
#----------------------------------------------------------------------------------------
#Each method on an API gateway resource has an integration which specifies where incoming requests are routed
#that requests to this method should be sent to the Lambda function
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}
#----------------------------------------------------------------------------------------
#The AWS_PROXY integration type causes API gateway to call into the API of another AWS service.
#In this case, it will call the AWS Lambda API to create an "invocation" of the Lambda function.
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.nextjs.invoke_arn
}
#----------------------------------------------------------------------------------------
#Unfortunately the proxy resource cannot match an empty path at the root of the API.
#To handle that, a similar configuration must be applied to the root resource
#that is built in to the REST API object:
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id   = aws_api_gateway_rest_api.rest-api-proxy.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.nextjs.invoke_arn
}
#----------------------------------------------------------------------------------------
#you need to create an API Gateway "deployment" in order to activate the configuration
#and expose the API at a URL that can be used for testing:
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_deployment" "aws_api_gateway_deployment_test" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root
  ]

  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  stage_name  = var.stage_name
}

resource "aws_api_gateway_deployment" "aws_api_gateway_deployment_prod" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root
  ]

  rest_api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  stage_name  = "prod"
}
#----------------------------------------------------------------------------------------
#By default any two AWS services have no access to one another, until access is explicitly granted.
#For Lambda functions, access is granted using the aws_lambda_permission resource
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.nextjs.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.rest-api-proxy.execution_arn}/*/*"
}
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_base_path_mapping" "api-gateway-base-path-mapping" {
  api_id      = aws_api_gateway_rest_api.rest-api-proxy.id
  stage_name  = aws_api_gateway_stage.api-gateway-stage-test.stage_name
  domain_name = aws_api_gateway_domain_name.api-gateway-domain-name.domain_name
}

resource "aws_api_gateway_stage" "api-gateway-stage-test" {
  deployment_id = aws_api_gateway_deployment.aws_api_gateway_deployment_prod.id
  rest_api_id   = aws_api_gateway_rest_api.rest-api-proxy.id

  stage_name = var.stage_name

  description = "nextjs-rest-api stage dev"

  cache_cluster_enabled = false
  #Allowed values include 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118 and 237
  cache_cluster_size = 0.5

  depends_on = [aws_cloudwatch_log_group.rest_api_cw_log]
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.rest_api_cw_log.arn
    #destination_arn = "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:log-group:API-Gateway-Access-Logs/${aws_api_gateway_rest_api.rest-api-proxy.name}"
    format = "$context.identity.sourceIp,$context.identity.caller,$context.identity.user,$context.identity.apiKeyId,$context.identity.userAgent,$context.requestTime,$context.httpMethod,$context.resourcePath,$context.protocol,$context.status,$context.wafResponseCode,$context.responseLength,$context.requestId,$context.extendedRequestId"
  }
  tags = {
    Name = "api-gateway-stage-test"
  }
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_usage_plan" "api-gateway-usage-plan" {
  name         = "api-GW-usage-plan"
  description  = "api-GW-usage-plan"
  product_code = "MYCODE"

  api_stages {
    api_id = aws_api_gateway_rest_api.rest-api-proxy.id
    stage  = aws_api_gateway_stage.api-gateway-stage-test.stage_name
  }

  # api_stages {
  #   api_id = aws_api_gateway_rest_api.rest-api-proxy.id
  #   stage  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
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
    Name = "api-gateway-usage-plan"
  }
}

resource "aws_api_gateway_domain_name" "api-gateway-domain-name" {
  domain_name              = "api.${var.DOMAIN_NAME}"
  regional_certificate_arn = aws_acm_certificate_validation.acm-certificate-validation.certificate_arn
  #TLS_1_0 and TLS_1_2
  security_policy = "TLS_1_2"

  #EDGE or REGIONAL
  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "api-gateway-domain-name"
  }
}
# #------------------------------------------------------------------------------------------------------------

resource "aws_api_gateway_account" "api-gateway-account" {
  cloudwatch_role_arn = aws_iam_role.iam-role-api-gw-cw.arn
}
# #------------------------------------------------------------------------------------------------------------
resource "aws_route53_record" "route53-record" {
  allow_overwrite = true
  name            = aws_api_gateway_domain_name.api-gateway-domain-name.domain_name
  type            = "A"
  zone_id         = data.aws_route53_zone.main-zone.zone_id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.api-gateway-domain-name.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.api-gateway-domain-name.regional_zone_id
  }
}
#-----------------------------------------------------------------------------
# resource "aws_api_gateway_api_key" "api-gateway-api-key" {
#   name = "api-key"
# }
# #-----------------------------------------------------------------------------
# resource "aws_api_gateway_usage_plan_key" "api-gateway-usage-plan-key" {
#   key_id        = aws_api_gateway_api_key.api-gateway-api-key.id
#   key_type      = "API_KEY"
#   usage_plan_id = aws_api_gateway_usage_plan.api-gateway-usage-plan.id
# }
#-----------------------------------------------------------------------------
#In order to test the created API you will need to access its test URL
#-----------------------------------------------------------------------------
output "api-gateway-invoke-url-test" {
  value = aws_api_gateway_deployment.aws_api_gateway_deployment_test.invoke_url
}

output "api-gateway-invoke-url-prod" {
  value = aws_api_gateway_deployment.aws_api_gateway_deployment_prod.invoke_url
}

#-----------------------------------------------------------------------------
#----------------------------------------------------------------------------------------

