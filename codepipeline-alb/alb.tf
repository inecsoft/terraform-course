#----------------------------------------------------------------------------------
resource "aws_lb" "codepipeline" {
  name               = "${local.default_name}-alb"
  subnets            = module.vpc.public_subnets
  security_groups    = ["${aws_security_group.codepipeline-lb-sg.id}"]
  internal           = false
  load_balancer_type = application
  ip_address_type    = "ipv4"

  enable_deletion_protection = false
  enable_http2               = true
  #routing.http.drop_invalid_header_fields.enabled

  idle_timeout = 60

  access_logs = {
    bucket  = "${aws_s3_bucket.codepipeline-alb-logs.id}"
    enabled = true
  }

  tags = {
    Name = "${local.default_name}-alb"
  }
}
#----------------------------------------------------------------------------------
output "aws_lb_arn" {
  description = "The ID and ARN of the ALB we created."
  value       = aws_lb.codepipeline.arn
}
output "aws_lb_id" {
  description = "The ID and ID of the ALB we created."
  value       = aws_lb.codepipeline.id
}
output "aws_lb_dns_name" {
  description = "The dns_name of the ALB we created."
  value       = aws_lb.codepipeline.dns_name
}
output "aws_lb_zone_id" {
  description = "The zone_id of the ALB we created."
  value       = aws_lb.codepipeline.zone_id
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "blue" {
  name     = "${local.default_name}-http-blue"
  port     = "3000"
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  target_type          = "ip"
  deregistration_delay = "30"

  slow_start = 0

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 86400
    enabled         = false
  }
  health_check {
    enabled           = true
    healthy_threshold = 3
    interval          = 30
    matcher           = "200-399"
    path              = "/"
    port              = "traffic-port"
    #port                = "3000"
    protocol            = "HTTP"
    timeout             = 6
    unhealthy_threshold = 3
  }


  tags = {
    Name = "${local.default_name}-blue-tg"
  }
}
#----------------------------------------------------------------------------------
output "aws_lb_target-blue_group_id" {
  value = aws_lb_target_group.blue.id
}
output "aws_lb_target-blue_group_arn" {
  value = aws_lb_target_group.blue.arn
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "green" {
  name     = "${local.default_name}-http-green"
  port     = "3000"
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  #when you create any target groups for these services, you must choose ip as the target type, not instance.
  #This is because tasks that use the awsvpc network mode are associated with an ENI, not with an Amazon EC2 instance.
  target_type          = "ip"
  deregistration_delay = "30"

  slow_start = 0

  stickiness {
    type            = "lb_cookie"
    cookie_duration = 86400
    enabled         = false
  }
  health_check {
    enabled           = true
    healthy_threshold = 3
    interval          = 30
    matcher           = "200-399"
    path              = "/"
    port              = "traffic-port"
    #port                = "3000"
    protocol            = "HTTP"
    timeout             = 6
    unhealthy_threshold = 3
  }


  tags = {
    Name = "${local.default_name}-green-tg"
  }
}
#----------------------------------------------------------------------------------
output "aws_lb_target-green_group_id" {
  value = aws_lb_target_group.green.id
}
output "aws_lb_target-green_group_arn" {
  value = aws_lb_target_group.green.arn
}
#----------------------------------------------------------------------------------
#resource "aws_autoscaling_attachment" "alb_autoscale" {
#  alb_target_group_arn   = "${aws_lb_target_group.blue.arn}"
#  autoscaling_group_name = "${aws_autoscaling_group.autoscale_group.id}"
#}
#----------------------------------------------------------------------------------
resource "aws_lb_listener" "codepipeline-80" {
  load_balancer_arn = aws_lb.codepipeline.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      host        = "#{host}"
      path        = "/#{path}"
      port        = "443"
      protocol    = "HTTPS"
      query       = "#{query}"
      status_code = "HTTP_301"
    }
  }
}
#----------------------------------------------------------------------------------
resource "aws_lb_listener" "codepipeline-443" {
  load_balancer_arn = aws_lb.codepipeline.arn
  port              = "443"
  protocol          = "HTTPS"
  #https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies
  #default ELBSecurityPolicy-2016-08
  ssl_policy      = "ELBSecurityPolicy-FS-1-1-2019-08"
  certificate_arn = module.acm.this_acm_certificate_arn


  #  default_action {
  #    type = "authenticate-cognito"

  #    authenticate_cognito {
  #      user_pool_arn       = "${aws_cognito_user_pool.pool.arn}"
  #      user_pool_client_id = "${aws_cognito_user_pool_client.client.id}"
  #      user_pool_domain    = "${aws_cognito_user_pool_domain.domain.domain}"
  #    }
  #  }

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.blue.arn
  }

  lifecycle {
    ignore_changes = [
      default_action,
    ]
  }
}
#------------------------------------------------------------------------

output "aws_lb_listener_arn-80" {
  description = "The ARN of the listener we created."
  value       = aws_lb_listener.codepipeline-80.arn
}
output "aws_lb_listener_id-80" {
  description = "The ID of the listener we created."
  value       = aws_lb_listener.codepipeline-80.id
}
output "aws_lb_listener_arn-443" {
  description = "The ARN of the listener-2 we created."
  value       = aws_lb_listener.codepipeline-443.arn
}
output "aws_lb_listener_id-443" {
  description = "The ID of the listener-2 we created."
  value       = aws_lb_listener.codepipeline-443.id
}
#----------------------------------------------------------------------------------
