#------------------------------------------------------------------------------------------------------------
resource  "aws_api_gateway_account"  "api-gateway-account"  {    
  cloudwatch_role_arn  = aws_iam_role.iam-role-api-gw-cw.arn
}
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
# #------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_domain_name" "api-gateway-domain-name" {
  domain_name              = "${local.default_name}.transport-for-greater-manchester.com"
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
# #------------------------------------------------------------------------------------------------------------
data "aws_route53_zone" "route53-zone-selected" {
  name = "transport-for-greater-manchester.com"
}
# #------------------------------------------------------------------------------------------------------------
resource "aws_route53_record" "route53-record" {
  allow_overwrite   = true
  name              = aws_api_gateway_domain_name.api-gateway-domain-name.domain_name
  type              = "A"
  zone_id           = data.aws_route53_zone.route53-zone-selected.zone_id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.api-gateway-domain-name.regional_domain_name
    zone_id                = aws_api_gateway_domain_name.api-gateway-domain-name.regional_zone_id
  }
}
#------------------------------------------------------------------------------------------------------------
resource "aws_api_gateway_base_path_mapping" "api-gateway-base-path-mapping" {
  api_id      = aws_api_gateway_rest_api.rest-api-acme-shoes.id
  stage_name  = aws_api_gateway_stage.api-gateway-stage-dev.stage_name
  domain_name = aws_api_gateway_domain_name.api-gateway-domain-name.domain_name
}
#-----------------------------------------------------------------------------
resource "aws_api_gateway_deployment" "api-gateway-deployment" {
  rest_api_id = aws_api_gateway_rest_api.rest-api-acme-shoes.id

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
    api_gateway        = filebase64sha256("8-api_gateway.tf")
    api-resource-order = filebase64sha256("8-api-resource-order.tf")
    api-resource-ping  = filebase64sha256("8-api-resource-ping.tf")
    api-resource-shoes = filebase64sha256("8-api-resource-shoes.tf")
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