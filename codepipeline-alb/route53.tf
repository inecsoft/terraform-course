#-----------------------------------------------------------------------------------
resource "aws_route53_record" "codepipeline_r53_r" {
    zone_id = data.aws_route53_zone.codepipeline.zone_id
    name = "codepipeline"
    type = "A"

    alias {
      name                   = "${aws_lb.codepipeline.dns_name}"
      zone_id                = "${aws_lb.codepipeline.zone_id}"
      evaluate_target_health = true
    }
}
#-----------------------------------------------------------------------------------
output "aws_route53_record" {
  value = "${aws_route53_record.codepipeline_r53_r.fqdn}"
}
#-----------------------------------------------------------------------------------
