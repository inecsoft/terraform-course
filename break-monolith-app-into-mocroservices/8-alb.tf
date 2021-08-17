#----------------------------------------------------------------------------------
resource "aws_lb" "alb" {
  name            = "${local.default_name}-alb"
  subnets         = module.vpc.public_subnets
  security_groups = [aws_security_group.lb-sg.id]
  internal        = false
  idle_timeout    = 60

  tags = {
    Name = "${local.default_name}-alb"
  }
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "alb_target_group" {
  name     = "${local.default_name}-alb-tg"
  port     = "3000"
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  target_type                   = "instance"
  slow_start                    = 0
  load_balancing_algorithm_type = "round_robin"
  deregistration_delay          = 300

  health_check {
    enabled             = true
    healthy_threshold   = 5
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  stickiness {
    cookie_duration = 86400
    enabled         = false
    type            = "lb_cookie"
  }

  tags = {
    Name = "${local.default_name}-alb-tg"
  }
}
#----------------------------------------------------------------------------------
resource "aws_autoscaling_attachment" "asg-attach" {
  alb_target_group_arn   = aws_lb_target_group.alb_target_group.arn
  autoscaling_group_name = aws_autoscaling_group.asg.id
}

#----------------------------------------------------------------------------------
resource "aws_lb_listener" "alb_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  # default_action {
  #   type = "redirect"

  #   redirect {
  #      host        = "#{host}"
  #      path        = "/#{path}"
  #      port        = "443"
  #      protocol    = "HTTPS"
  #      query       = "#{query}"
  #      status_code = "HTTP_301"
  #   }
  # }

  #testing config: this is the alb-listener-443 config in production 
  default_action {
    target_group_arn = aws_lb_target_group.alb_target_group.arn
    type             = "forward"
  }
}
#----------------------------------------------------------------------------------
