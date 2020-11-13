#-------------------------------------------------------------------
resource "aws_apigatewayv2_domain_name" "apigatewayv2-domain-name" {
  domain_name = var.zone
  
  depends_on = [ aws_acm_certificate.acm-certificate ]
  
  provisioner "local-exec" {
    command = "sleep 15"
  }
  
  domain_name_configuration {
    certificate_arn = aws_acm_certificate.acm-certificate.arn
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }

  tags = {
    Name = "${local.default_name}-api-domain"
  }
}
#-------------------------------------------------------------------
output "apigatewayv2-domain-name-id" {
  description = "The domain name identifier"
  value       = aws_apigatewayv2_domain_name.apigatewayv2-domain-name.id
}
#-------------------------------------------------------------------