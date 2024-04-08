resource "aws_alb" "ecs_load_balancer" {
  name            = "ecs-fargate-load-balancer"
  security_groups = [aws_security_group.ecs_security_group.id]
  subnets         = aws_subnet.ecs_subnets.*.id

  tags = {
    Name = "ecs-load-balancer"
  }
}

resource "aws_alb_target_group" "ecs_target_group" {
  name     = "ecs-fargate-target-group"
  ip_address_type                    = "ipv4"
  target_type                        = "ip" #"instance"
  lambda_multi_value_headers_enabled = false

  load_balancing_algorithm_type      = "round_robin"
  load_balancing_anomaly_mitigation  = "off"
  load_balancing_cross_zone_enabled  = "use_load_balancer_configuration"
  port     = "80"
  protocol = "HTTP"
  protocol_version                   = "HTTP1"
  proxy_protocol_v2                  = false
  slow_start                         = 0

  vpc_id   = aws_vpc.ecs_vpc.id

  lifecycle {
    create_before_destroy = true
  }

  health_check {
    healthy_threshold   = "3"
    unhealthy_threshold = "2"
    interval            = "30"
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = "5"
  }

  stickiness {
    cookie_duration = 86400
    enabled         = false
    type            = "lb_cookie"
  }


  depends_on = [aws_alb.ecs_load_balancer]

  tags = {
    Name = "ecs-fargete-target-group"
  }
}

resource "aws_alb_listener" "alb_listener" {
  load_balancer_arn = aws_alb.ecs_load_balancer.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_alb_target_group.ecs_target_group.arn
    type             = "forward"
  }
}


output "ecs_load_balancer_dns_name" {
  value = aws_alb.ecs_load_balancer.dns_name
}