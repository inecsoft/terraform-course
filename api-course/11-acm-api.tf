# #-----------------------------------------------------------------------------
resource "aws_acm_certificate" "acm-certificate" {
  domain_name       = "${local.default_name}.transport-for-greater-manchester.com"
  validation_method = "DNS"
  subject_alternative_names = ["*.${local.default_name}.transport-for-greater-manchester.com"]
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.default_name}-acm-certificate"
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
  zone_id         = data.aws_route53_zone.route53-zone-selected.zone_id
}
# #-----------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "acm-certificate-validation" {
  certificate_arn         = aws_acm_certificate.acm-certificate.arn
  validation_record_fqdns = [ for record in aws_route53_record.route53-record-acm-certificate : record.fqdn ]
}
# #-----------------------------------------------------------------------------