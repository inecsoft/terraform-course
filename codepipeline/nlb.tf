#-----------------------------------------------------------------------------------------------
resource "aws_lb" "codepipeline" {
  name                             = "codepipeline"
  subnets                          = module.vpc.public_subnets
  load_balancer_type               = "network"
  enable_cross_zone_load_balancing = true
}
#-----------------------------------------------------------------------------------------------
resource "aws_lb_listener" "codepipeline" {
  load_balancer_arn = aws_lb.codepipeline.arn
  port              = "80"
  protocol          = "TCP"

  default_action {
    target_group_arn = aws_lb_target_group.blue.id
    type             = "forward"
  }
  lifecycle {
    ignore_changes = [
      default_action,
    ]
  }
}
#-----------------------------------------------------------------------------------------------
resource "aws_lb_target_group" "blue" {
  name                 = "http-blue"
  port                 = "3000"
  protocol             = "TCP"
  target_type          = "ip"
  vpc_id               = module.vpc.vpc_id
  deregistration_delay = "30"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    protocol            = "TCP"
    interval            = 30
  }
}
#-----------------------------------------------------------------------------------------------
resource "aws_lb_target_group" "green" {
  name                 = "http-green"
  port                 = "3000"
  protocol             = "TCP"
  target_type          = "ip"
  vpc_id               = module.vpc.vpc_id
  deregistration_delay = "30"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    protocol            = "TCP"
    interval            = 30
  }
}
#-----------------------------------------------------------------------------------------------
