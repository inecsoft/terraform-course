#-----------------------------------------------------------------------
resource "aws_route53_zone" "newtech-zone" {
  name = "cubasalsa.cub"
}
#-----------------------------------------------------------------------
resource "aws_route53_record" "server1-record" {
  zone_id = aws_route53_zone.newtech-zone.zone_id
  name    = "server1"
  type    = "A"
  ttl     = "300"
  records = ["104.236.247.8"]
}
#-----------------------------------------------------------------------
resource "aws_route53_record" "www-record" {
  zone_id = aws_route53_zone.newtech-zone.zone_id
  name    = "www"
  type    = "A"
  alias {
    name    = aws_elb.example.dns_name
    zone_id = aws_elb.example.zone_id
  }
  ttl        = "300"
  depends_on = [aws_elb.example]
}

#-----------------------------------------------------------------------
output "ns-servers" {
  value = aws_route53_zone.newtech-zone.name_servers
}
#-----------------------------------------------------------------------

