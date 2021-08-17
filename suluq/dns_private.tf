resource "aws_route53_zone" "private" {
  name = "${local.default_name}.local"

  vpc {
    vpc_id = module.vpc.vpc_id
  }
  force_destroy = true

  tags = {
    name = "${local.default_name}-zone"
  }
}

resource "aws_route53_record" "bastion" {
  zone_id = aws_route53_zone.private.zone_id
  name    = "bastion.${local.default_name}.local"
  type    = "A"

  ttl     = "300"
  records = ["${aws_instance.bastion.private_ip}"]
}