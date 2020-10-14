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
  comment = "zone sub domain for SES"
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
resource "aws_route53_record" "cloud-zone-A-rec" {
  zone_id = aws_route53_zone.cloud-zone.zone_id
  name    = var.domain
  type    = "A"
  ttl     = "300"
  records = ["217.160.0.151"]
}
#------------------------------------------------------------------------------------------