#-------------------------------------------------------------------
data "aws_route53_zone" "main-zone" {
  name         = "inecsoft.co.uk"
  private_zone = false
}
#-------------------------------------------------------------------------------------------------------------------
#Public Subdomain Zone
#For use in subdomains, note that you need to create a aws_route53_record of type NS as well as the subdomain zone.
#-------------------------------------------------------------------------------------------------------------------
resource "aws_route53_zone" "zone" {
  name = var.zone
  comment = "zone sub domain for api"
  force_destroy  = true

  tags = {
    Name = "${local.default_name}-zone"
  }
}
#-------------------------------------------------------------------------------------------------------------------
#When DNS queries the subdomain, I checks the parent domain first for name servers (NS) records.
#So, the subdomain NS records need to be on the main domain.
#------------------------------------------------------------------------------------------
resource "aws_route53_record" "route53-zone-ns-rec" {
    zone_id = data.aws_route53_zone.main-zone.zone_id
    name    = var.zone
    type    = "NS"
    ttl     = "300"
    records = aws_route53_zone.zone.name_servers
}
#-----------------------------------------------------------------------------------------------------
resource "aws_acm_certificate" "acm-certificate" {
  domain_name                  = var.zone
  subject_alternative_names    = [ "*.${var.zone}" ]
  validation_method            = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.default_name}-zone-cert"
  }

}
#-------------------------------------------------------------------------------------------------------------------
# resource "aws_route53_record" "route53-record-cert-validation" {
#   name    = aws_acm_certificate.acm-certificate.domain_validation_options.resource_record_name
#   type    = aws_acm_certificate.acm-certificate.domain_validation_options.resource_record_type

#   zone_id = aws_route53_zone.zone.id

#   records = [ aws_acm_certificate.acm-certificate.domain_validation_options.resource_record_value ]
#   ttl     = 60
#   depends_on = [aws_acm_certificate.acm-certificate]
# }

resource "aws_route53_record" "route53-record-cert-validation" {
  for_each = {
    for dvo in aws_acm_certificate.acm-certificate.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = aws_route53_zone.zone.zone_id
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "acm-certificate-validation" {
  certificate_arn = aws_acm_certificate.acm-certificate.arn
  #validation_record_fqdns = [ aws_route53_record.route53-record-cert-validation.fqdn ]
  validation_record_fqdns = [ for record in aws_route53_record.route53-record-cert-validation : record.fqdn ]
}
#-----------------------------------------------------------------------------------------------------
resource "aws_route53_record" "route53-record-A" {
  name    = aws_apigatewayv2_domain_name.apigatewayv2-domain-name.domain_name
  type    = "A"
  zone_id = aws_route53_zone.zone.zone_id
 
  alias {
    name                   = aws_apigatewayv2_domain_name.apigatewayv2-domain-name.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.apigatewayv2-domain-name.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
#-------------------------------------------------------------------