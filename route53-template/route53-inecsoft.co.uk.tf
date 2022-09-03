resource "aws_route53_zone" "inecsoft_co_uk_zone" {
  name = "inecsoft.co.uk"

  tags = {
    "Name" = "inecsoft.co.uk-zone"
    "Environment" = "Prod"
  }
}


resource "aws_route53_record" "inecsoft_co_uk_txt" {
  for_each        = var.route53_inecsoft_co_uk_txt_records
  allow_overwrite = true
  name            = lookup(each.value, "name", "")
  ttl             = lookup(each.value, "ttl", "")
  type            = "TXT"

  zone_id = aws_route53_zone.inecsoft_co_uk_zone.zone_id
  records = lookup(each.value, "value", "")
}

resource "aws_route53_record" "inecsoft_co_uk_a" {
  for_each        = var.route53_inecsoft_co_uk_a_records
  allow_overwrite = true
  name            = lookup(each.value, "name", "")
  ttl             = lookup(each.value, "ttl", "")
  type            = "A"
  zone_id         = aws_route53_zone.inecsoft_co_uk_zone.zone_id

  records = lookup(each.value, "value", "")
}

resource "aws_route53_record" "inecsoft_co_uk_a_alias" {
  for_each        = var.route53_inecsoft_co_uk_a_alias_records
  allow_overwrite = true
  name            = lookup(each.value, "name", "")
  type            = "A"
  zone_id         = aws_route53_zone.inecsoft_co_uk_zone.zone_id

  alias {
    evaluate_target_health = "false"
    name                   = lookup(each.value, "value", "")
    zone_id                = "Z2FDTNDATAQYW2"
  }
}

resource "aws_route53_record" "inecsoft_co_uk_cname" {
  for_each        = var.route53_inecsoft_co_uk_cname_records
  allow_overwrite = true
  name            = lookup(each.value, "name", "")
  ttl             = lookup(each.value, "ttl", "")
  type            = "CNAME"
  zone_id         = aws_route53_zone.inecsoft_co_uk_zone.zone_id

  records = lookup(each.value, "value", "")
}

resource "aws_route53_record" "inecsoft_co_uk_mx" {
  for_each        = var.route53_inecsoft_co_uk_mx_records
  allow_overwrite = true
  name            = lookup(each.value, "name", "")
  ttl             = lookup(each.value, "ttl", "")
  type            = "MX"
  zone_id         = aws_route53_zone.inecsoft_co_uk_zone.zone_id

  records = lookup(each.value, "value", "")

}

resource "aws_route53_record" "inecsoft_co_uk_srv" {
  for_each        = var.route53_inecsoft_co_uk_srv_records
  allow_overwrite = true
  name            = lookup(each.value, "name", "")
  ttl             = lookup(each.value, "ttl", "")
  type            = "SRV"
  zone_id         = aws_route53_zone.inecsoft_co_uk_zone.zone_id

  records = lookup(each.value, "value", "")

}

#-----------------------------------------------------------------------------
#echo aws_acm_certificate.acm-certificate_inecsoft_co_uk.arn| terraform console 
resource "aws_acm_certificate" "acm-certificate_inecsoft_co_uk" {
  provider                  = aws.cloudfront
  domain_name               = "inecsoft.co.uk" #var.domain
  validation_method         = "DNS"
  subject_alternative_names = [  
    "inecsoft.co.uk",
    "www.inecsoft.co.uk"
  ] #var.aliases
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "inecsoft.co.uk" #var.tag
  }
}
#-----------------------------------------------------------------------------
output "acm-certificate_inecsoft_co_uk-status" {
  #provider = aws.cloudfront
  value = aws_acm_certificate.acm-certificate_inecsoft_co_uk.status
}

resource "aws_route53_record" "route53-record-acm-certificate_inecsoft_co_uk" {
  for_each = {
    for dvo in aws_acm_certificate.acm-certificate_inecsoft_co_uk.domain_validation_options : dvo.domain_name => {
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
  zone_id         = aws_route53_zone.inecsoft_co_uk_zone.zone_id
}
# #-----------------------------------------------------------------------------
resource "aws_acm_certificate_validation" "acm-certificate_inecsoft_co_uk-validation" {
  provider = aws.cloudfront
  certificate_arn         = aws_acm_certificate.acm-certificate_inecsoft_co_uk.arn
  validation_record_fqdns = [for record in aws_route53_record.route53-record-acm-certificate_inecsoft_co_uk : record.fqdn]
}
# #-----------------------------------------------------------------------------



