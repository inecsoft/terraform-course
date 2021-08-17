#-------------------------------------------------------------------
#Edge Optimized (ACM Certificate)
#-------------------------------------------------------------------
# resource "aws_api_gateway_domain_name" "api-gateway-domain-name" {
#   domain_name = var.zone

#   depends_on = [ aws_acm_certificate.acm-certificate ]

#   certificate_arn = aws_acm_certificate.acm-certificate.arn

#   tags = {
#     Name = "${local.default_name}-api-domain"
#   }
# }
#-------------------------------------------------------------------
output "api-gateway-cloudfront_domain_name" {
  description = "The cloudfront_domain_name"
  value       = aws_api_gateway_domain_name.api-gateway-domain-name.cloudfront_domain_name
}
#-------------------------------------------------------------------
#Regional (ACM Certificate)
#-------------------------------------------------------------------
resource "aws_api_gateway_domain_name" "api-gateway-domain-name" {
  domain_name              = var.zone
  regional_certificate_arn = aws_acm_certificate_validation.acm-certificate-validation.certificate_arn

  depends_on = [aws_acm_certificate.acm-certificate]

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = {
    Name = "${local.default_name}-api-domain"
  }
}
#-------------------------------------------------------------------
output "aws-api-gateway-domain-name" {
  description = "The domain name identifier"
  value       = aws_api_gateway_domain_name.api-gateway-domain-name.id
}
#------------------------------------------------------------------- 
output "api-gateway-regional_domain_name" {
  description = "The regional_domain_name"
  value       = aws_api_gateway_domain_name.api-gateway-domain-name.regional_domain_name
}
#-------------------------------------------------------------------