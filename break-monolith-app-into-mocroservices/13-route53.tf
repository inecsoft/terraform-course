###############################################################
# AWS ECS-ROUTE53
###############################################################
#-----------------------------------------------------------------------------
variable "domain" {
  default = "ecs.inecsoft.co.uk"
}
#------------------------------------------------------------------------------------------
data "aws_route53_zone" "main-zone" {
  name         = "inecsoft.co.uk"
  #private_zone = true

}
#------------------------------------------------------------------------------------------
#invalid value for domain (cannot end with a period)
#------------------------------------------------------------------------------------------
resource "aws_route53_zone" "cloud-zone" {
  name = var.domain
  comment = "zone sub domain for ecs"
  force_destroy  = true

  tags = {
    Name = "${local.default_name}-cloud-zone"
  }
}
#------------------------------------------------------------------------------------------
#When DNS queries the subdomain, I checks the parent domain first for name servers (NS) records.
#So, the subdomain NS records need to be on the main domain.
#------------------------------------------------------------------------------------------
resource "aws_route53_record" "cloud-zone-ns-rec" {
  zone_id = data.aws_route53_zone.main-zone.zone_id
  name    = var.domain
  type    = "NS"
  ttl     = "300"
  records = aws_route53_zone.cloud-zone.name_servers
}
#------------------------------------------------------------------------------------------
# resource "aws_route53_record" "cloud-zone-A-rec" {
#   zone_id = aws_route53_zone.cloud-zone.zone_id
#   name    = var.domain
#   type    = "A"
#   ttl     = "300"
#   records = ["217.160.0.151"]
# }
#------------------------------------------------------------------------------------------
resource "aws_route53_record" "cloud-zone-A-rec-alb" {
  zone_id = aws_route53_zone.cloud-zone.zone_id
  name    = var.domain
  type    = "A"

  alias {
    evaluate_target_health = false
    name                   = aws_lb.alb.dns_name
    zone_id                = aws_lb.alb.zone_id
  }
}
#------------------------------------------------------------------------------------------
