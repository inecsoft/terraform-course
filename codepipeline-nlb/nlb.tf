#-----------------------------------------------------------------------------------------------
resource "aws_lb" "codepipeline" {
  name                             = "codepipeline"
  subnets                          = module.vpc.public_subnets
  load_balancer_type               = "network"
  enable_cross_zone_load_balancing = true

  internal                   = false
  enable_deletion_protection = false

  access_logs = {
    bucket  = "${aws_s3_bucket.codepipeline-nlb-logs.id}"
    enabled = true
  }

  tags = {
    Name = "${local.default_name}-alb"
  }
}

output "nlb-dns-name" {
  value = aws_lb.codepipeline.dns_name
}
#-----------------------------------------------------------------------------------------------
resource "aws_lb_listener" "codepipeline" {
  load_balancer_arn = aws_lb.codepipeline.arn
  port              = "80"
  protocol          = "TCP"

  #ssl_policy        = 

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
  name     = "http-blue"
  port     = "3000"
  protocol = "TCP"
  #when you create any target groups for these services, you must choose ip as the target type, not instance. 
  #This is because tasks that use the awsvpc network mode are associated with an ENI, not with an Amazon EC2 instance.
  target_type          = "ip"
  vpc_id               = module.vpc.vpc_id
  deregistration_delay = "30"

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    protocol            = "TCP"
    interval            = 30
  }

  tags = {
    name = "${local.default_name}-blue-tg"
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
  tags = {
    Name = "${local.default_name}-green-tg"
  }
}
#-----------------------------------------------------------------------------------------------

