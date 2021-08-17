#--------------------------------------------------------------------------------------------
resource "aws_route53_record" "app-server-r53-r" {
  zone_id = data.aws_route53_zone.zone.zone_id
  name    = "form.mycmrs.com"
  type    = "A"

  alias {
    name                   = aws_elb.elb-app.dns_name
    zone_id                = aws_elb.elb-app.zone_id
    evaluate_target_health = true
  }
}
#--------------------------------------------------------------------------------------------
module "acm-app" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> 2.0"

  zone_id = data.aws_route53_zone.zone.zone_id

  domain_name               = "form.mycmrs.com"
  subject_alternative_names = ["*.form.mycmrs.com"]

  wait_for_validation = false
}
#--------------------------------------------------------------------------------------------
# create an elastic load balancer
#-------------------------------------------------------------------------------
resource "aws_elb" "elb-app" {
  name            = "${local.default_name}-elb-app"
  subnets         = [element(module.vpc.public_subnets, 1), element(module.vpc.public_subnets, 2)]
  security_groups = [aws_security_group.sg-elb-app.id]

  internal = false

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 443
    lb_protocol       = "https"
    #    ssl_certificate_id = "arn:aws:iam::123456789012:server-certificate/certName"
    ssl_certificate_id = module.acm-app.this_acm_certificate_arn
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 5
    timeout             = 5
    target              = "HTTP:80/"
    interval            = 30
  }

  #instances = ["${aws_instance.example-instance.id}"]
  # optional you can also attach an ELB to an autoscaling group.

  cross_zone_load_balancing   = true
  connection_draining         = false
  connection_draining_timeout = 300

  tags = {
    Name = "${local.default_name}-elb-app"
  }
}
#------------------------------------------------------------------------------

