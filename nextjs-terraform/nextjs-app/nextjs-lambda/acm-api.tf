#-------------------------------------------------------------------
data "aws_route53_zone" "main-zone" {
  name         = "dumy.transport-for-greater-manchester.com"
  private_zone = false
}
#-------------------------------------------------------------------------------------------------------------------
#Public Subdomain Zone
#For use in subdomains, note that you need to create a aws_route53_record of type NS as well as the subdomain zone.
#-------------------------------------------------------------------------------------------------------------------
/* resource "aws_route53_zone" "zone" {
  name          = "dumy.transport-for-greater-manchester.com"
  comment       = "zone sub domain for api"
  force_destroy = true

  tags = {
    Name = "route-53-zone"
  }
} */
#-------------------------------------------------------------------------------------------------------------------
#When DNS queries the subdomain, I checks the parent domain first for name servers (NS) records.
#So, the subdomain NS records need to be on the main domain.
#------------------------------------------------------------------------------------------
/* resource "aws_route53_record" "route53-zone-ns-rec" {
  zone_id = data.aws_route53_zone.main-zone.zone_id
  name    = var.zone
  type    = "NS"
  ttl     = "300"
  records = aws_route53_zone.zone.name_servers
} */
# #-----------------------------------------------------------------------------
resource "aws_acm_certificate" "acm-certificate" {
  domain_name               = "dumy.transport-for-greater-manchester.com"
  validation_method         = "DNS"
  subject_alternative_names = ["*.dumy.transport-for-greater-manchester.com"]

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "acm-certificate"
  }
}
#-----------------------------------------------------------------------------
output "acm-certificate-status" {
  value = aws_acm_certificate.acm-certificate.status
}
#-----------------------------------------------------------------------------
resource "aws_route53_record" "route53-record-acm-certificate" {
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
  zone_id         = data.aws_route53_zone.main-zone.zone_id
}
# #-----------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "acm-certificate-validation" {
  certificate_arn         = aws_acm_certificate.acm-certificate.arn
  validation_record_fqdns = [for record in aws_route53_record.route53-record-acm-certificate : record.fqdn]
}
# #-----------------------------------------------------------------------------