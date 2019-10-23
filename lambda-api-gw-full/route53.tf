#---------------------------------------------------------------------------------------------------
resource "aws_acm_certificate" "cert" {
  domain_name               = "*.api.api-inecsoft.cub"
  subject_alternative_names = ["prod.api.api-inecsoft.cub", "dev.api.api-inecsoft.cub"]
  validation_method         = "DNS"
 
  lifecycle {
         create_before_destroy = true
  }
}
#---------------------------------------------------------------------------------------------------

resource "aws_route53_zone" "zone" {
  name = "api.api-inecsoft.cub"
}
data "aws_route53_zone" "zone" {
  name = "api.api-inecsoft.cub."
  depends_on = [aws_route53_zone.zone]
  private_zone = false
}

#---------------------------------------------------------------------------------------------------
resource "aws_route53_record" "cert_validation" {
  name    = aws_acm_certificate.cert.domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options[0].resource_record_type
  zone_id = data.aws_route53_zone.zone.id
  records = [aws_acm_certificate.cert.domain_validation_options[0].resource_record_value]
  ttl     = 60
}

#---------------------------------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}

#---------------------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------------------
#Registers a custom domain name for use with AWS API Gateway
#This resource just establishes ownership of and the TLS settings for a particular domain name
#---------------------------------------------------------------------------------------------------
resource "aws_api_gateway_domain_name" "api_domain_name" {
  certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
  domain_name     = "api.api-inecsoft.cub"
}

# api_domain_name DNS record using Route53.
# Route53 is not specifically required; any DNS host can be used.

resource "aws_route53_record" "api_domain_name" {
  name    = aws_api_gateway_domain_name.api_domain_name.domain_name
  type    = "A"
  zone_id = aws_route53_zone.zone.id

  alias {
    evaluate_target_health = true
    name                   = aws_api_gateway_domain_name.api_domain_name.cloudfront_domain_name
    zone_id                = aws_api_gateway_domain_name.api_domain_name.cloudfront_zone_id
  }
}

resource "aws_api_gateway_base_path_mapping" "api_domain_map" {
  api_id      = aws_api_gateway_rest_api.example.id
  stage_name  = aws_api_gateway_deployment.prod.stage_name
  domain_name = aws_api_gateway_domain_name.api_domain_name.domain_name
}

#---------------------------------------------------------------------------------------------------
#An API can be attached to a particular path under the registered domain name using the aws_api_gateway_base_path_mapping resource
#---------------------------------------------------------------------------------------------------
output "cloudfront_domain_name" {
  value = aws_api_gateway_domain_name.api_domain_name.cloudfront_domain_name
}

#---------------------------------------------------------------------------------------------------
#aws apigateway create-domain-name \ 
#    --domain-name 'regional.example.com' \
#    --endpoint-configuration types=REGIONAL \ 
#    --regional-certificate-arn 'arn:aws:acm:eu-west-1:123456789012:certificate/c19332f0-3be6-457f-a244-e03a423084e6' 
