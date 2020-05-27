#-----------------------------------------------------------------------------------
data "aws_route53_zone" "codepipeline" {
  name         = "inchoratech.com"
}

resource "aws_route53_zone" "codepipeline-public" {
    name       = "${var.domain}"
    comment    = ""

    tags = {
     Name = "codepipeline"
  }
}
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
output "Domain-name" {
  value = "${aws_route53_record.codepipeline_r53_r.fqdn}"
}
#-----------------------------------------------------------------------------------
##################################################################
# ssl certificte for the domain
##################################################################
module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> 2.0"

  domain_name = var.domain # trimsuffix(data.aws_route53_zone.this.name, ".") # Terraform >= 0.12.17
  zone_id = data.aws_route53_zone.codepipeline.zone_id
  //zone_id      = aws_route53_zone.main-primary-zone.id
  subject_alternative_names = ["*.${var.domain}"]

  wait_for_validation = false
}
#-----------------------------------------------------------------------------------