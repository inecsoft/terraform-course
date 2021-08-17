#-------------------------------------------------------------------------------------------------------------------
#Public Subdomain Zone
#For use in subdomains, note that you need to create a aws_route53_record of type NS as well as the subdomain zone.
#-------------------------------------------------------------------------------------------------------------------

#-------------------------------------------------------------------------------------------------------------------
resource "aws_route53_zone" "zone" {
  name = var.zone

  tags = {
    Name = "${local.default_name}-zone"
  }
}
#-------------------------------------------------------------------------------------------------------------------
# resource "aws_route53_record" "zone-rec" {
#   zone_id = aws_route53_zone.zone.zone_id
#   name    = var.zone
#   type    = "NS"
#   ttl     = "30"

#   records = [
#     aws_route53_zone.zone.name_servers[0],
#     aws_route53_zone.zone.name_servers[1],
#     aws_route53_zone.zone.name_servers[2],
#     aws_route53_zone.zone.name_servers[3],
#   ]
# }
#-------------------------------------------------------------------------------------------------------------------
resource "aws_route53_record" "www" {
  depends_on = [aws_eip.eip]
  zone_id    = aws_route53_zone.zone.zone_id
  name       = var.zone
  type       = "A"
  ttl        = "300"
  records    = [aws_eip.eip.public_ip]

}
#-------------------------------------------------------------------------------------------------------------------
#data "aws_route53_zone" "zone" {
#  name         = "ecs.inecsoft.cub"
#  private_zone = false
#}
# #-------------------------------------------------------------------------------------------------------------------
# resource "aws_route53_record" "cert_validation" {
#     name    = aws_acm_certificate.certificate.domain_validation_options.0.resource_record_name
#     type    = aws_acm_certificate.certificate.domain_validation_options.0.resource_record_type
#     #zone_id = "${data.aws_route53_zone.zone-sub.id}"
#     zone_id = aws_route53_zone.zone.id
#     records = [ aws_acm_certificate.certificate.domain_validation_options.0.resource_record_value ]
#     ttl     = 60
#     depends_on = [aws_acm_certificate.certificate]
# }
# #-------------------------------------------------------------------------------------------------------------------
# resource "aws_acm_certificate" "certificate" {
#   domain_name       = "*.${var.zone}"
#   validation_method = "DNS"

#   tags = {
#     Name = "${local.default_name}-zone-cert"
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }
# #-------------------------------------------------------------------------------------------------------------------
# resource "aws_acm_certificate_validation" "certificate" {
#     certificate_arn = aws_acm_certificate.certificate.arn
#     validation_record_fqdns = [ aws_route53_record.cert_validation.fqdn ]
# }
# #-------------------------------------------------------------------------------------------------------------------

