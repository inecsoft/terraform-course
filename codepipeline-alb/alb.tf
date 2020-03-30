#----------------------------------------------------------------------------------
resource "aws_lb" "codepipeline" {  
  name            = "codepipeline"  
  subnets         =  module.vpc.public_subnet
  security_groups = ["${aws_security_group.sec_lb.id}"]
  internal        = false 
  idle_timeout    = 60   

  tags = {    
    Name    = "${local.default_name}-alb"    
  }   
}
 output "nlb-dns-name" {$
   value = aws_lb.codepipeline.dns_name$
 }$

#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "blue" {  
  name     = "http-blue"  
  port     = "3000"  
  protocol = "HTTP"  
  vpc_id   =  module.vpc.vpc_id
   
  target_type          = "ip"
  deregistration_delay = "30"

  stickiness {    
    type            = "lb_cookie"    
    cookie_duration = 1800    
    enabled         = true 
  }   

  health_check {    
    healthy_threshold   = 3    
    unhealthy_threshold = 10    
    timeout             = 5    
    interval            =  
    path                = "/"    
    port                = 3000
  }

  tags = { 
     name =  "${local.default_name}-blue-tg"
  } 
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "green" {  
  name     = "http-blue"  
  port     = "3000"  
  protocol = "HTTP"  
  vpc_id   =  module.vpc.vpc_id
   
  target_type          = "ip"
  deregistration_delay = "30"

  stickiness {    
    type            = "lb_cookie"    
    cookie_duration = 1800    
    enabled         = true 
  }   

  health_check {    
    healthy_threshold   = 3    
    unhealthy_threshold = 10    
    timeout             = 5    
    interval            =  
    path                = "/"    
    port                = 3000
  }

  tags = { 
     name =  "${local.default_name}-green-tg"
  } 
}
#----------------------------------------------------------------------------------
#resource "aws_autoscaling_attachment" "alb_autoscale" {
#  alb_target_group_arn   = "${aws_lb_target_group.blue.arn}"
#  autoscaling_group_name = "${aws_autoscaling_group.autoscale_group.id}"
#}
#----------------------------------------------------------------------------------
resource "aws_lb_listener" "codepipeline" {  
  load_balancer_arn = "${aws_lb.codepipeline.arn}"  
  port              = 80  
  protocol          = "HTTP"
  
  default_action {    
    target_group_arn = "${aws_lb_target_group.blue.arn}"
    type             = "forward"  
  }
  lifecycle {
     ignore_changes = [
       default_action,
     ]
  }
}
#----------------------------------------------------------------------------------

