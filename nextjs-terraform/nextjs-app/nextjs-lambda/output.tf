output "cloudfront_domain_name" {
  value = aws_route53_record.cloudfront_domain.name
}

output "application_domain" {
  value = aws_route53_record.application_domain.name
}