resource "aws_apigatewayv2_domain_name" "api_gw_domain" {
  domain_name = "api-${var.DOMAIN_NAME}"

  depends_on = [ aws_acm_certificate.acm-certificate ]
  domain_name_configuration {
    certificate_arn = aws_acm_certificate.acm-certificate.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}


resource "aws_route53_record" "application_domain" {
  name    = aws_apigatewayv2_domain_name.api_gw_domain.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.main-zone.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cloudfront_domain" {
  name    = var.DOMAIN_NAME
  type    = "A"
  zone_id = data.aws_route53_zone.main-zone.zone_id

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_api_mapping" "api_gw_domain_mapping" {
  api_id      = aws_apigatewayv2_api.httpAPI.id
  domain_name = aws_apigatewayv2_domain_name.api_gw_domain.id
  stage       = "$default"
}