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
  port     = "80"
  protocol = "HTTP"
  vpc_id   = aws_vpc.ecs_vpc.id

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

