#-----------------------------------------------------------------------
resource "aws_route53_zone" "newtech-zone" {
  name = "cubasalsa.cub"
}
#-----------------------------------------------------------------------
resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.newtech-zone.zone_id
  name    = "server1"
  type    = "CNAME"
  ttl     = "300"
  records = ["${aws_elastic_beanstalk_environment.app-prod.cname}"]

}

#-----------------------------------------------------------------------
output "ns-servers" {
  value = aws_route53_zone.newtech-zone.name_servers
}
#-----------------------------------------------------------------------

