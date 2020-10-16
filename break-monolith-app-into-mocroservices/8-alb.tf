#----------------------------------------------------------------------------------
resource "aws_lb" "alb" {  
  name            = "${local.default_name}-alb"  
  subnets         = module.vpc.public_subnets
  security_groups = [ aws_security_group.lb-sg.id ]
  internal        = false 
  idle_timeout    = 60  

  tags = {    
    Name    = "${local.default_name}-alb"
  }
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "alb_target_group" {  
  name     = "${local.default_name}-alb-tg"
  port     = "80"  
  protocol = "HTTP"  
  vpc_id   = module.vpc.vpc_id   
  
  stickiness {    
    type            = "lb_cookie"    
    cookie_duration = 1800    
    enabled         = true 
  }   

  health_check {    
    healthy_threshold   = 3    
    unhealthy_threshold = 10    
    timeout             = 5    
    interval            = 10    
    path                = "/"    
    port                = 80
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
  
  default_action {    
    target_group_arn = aws_lb_target_group.alb_target_group.arn
    type             = "forward"  
  }
}
#----------------------------------------------------------------------------------
# aws_lb_target_group.alb_target_group:
# resource "aws_lb_target_group" "alb_target_group" {
#     arn                           = "arn:aws:elasticloadbalancing:eu-west-1:895352585421:targetgroup/ecs-inecso-inecsoft/9fbd86e9974e2034"
#     arn_suffix                    = "targetgroup/ecs-inecso-inecsoft/9fbd86e9974e2034"
#     deregistration_delay          = 300
#     id                            = "arn:aws:elasticloadbalancing:eu-west-1:895352585421:targetgroup/ecs-inecso-inecsoft/9fbd86e9974e2034"
#     load_balancing_algorithm_type = "round_robin"
#     name                          = "ecs-inecso-inecsoft"
#     port                          = 80
#     protocol                      = "HTTP"
#     slow_start                    = 0
#     tags                          = {}
#     target_type                   = "instance"
#     vpc_id                        = "vpc-0b277ca41160520f5"

#     health_check {
#         enabled             = true
#         healthy_threshold   = 5
#         interval            = 30
#         matcher             = "200"
#         path                = "/"
#         port                = "traffic-port"
#         protocol            = "HTTP"
#         timeout             = 5
#         unhealthy_threshold = 2
#     }

#     stickiness {
#         cookie_duration = 86400
#         enabled         = false
#         type            = "lb_cookie"
#     }
# }