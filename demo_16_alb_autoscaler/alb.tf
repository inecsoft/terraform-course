#----------------------------------------------------------------------------------
resource "aws_lb" "alb" {  
  name            = "alb"  
  subnets         = ["${aws_subnet.main-public-1.id}","${aws_subnet.main-public-2.id}","${aws_subnet.main-public-3.id}"]
  security_groups = ["${aws_security_group.sec_lb.id}"]
  internal        = false 
  idle_timeout    = 60   
  tags = {    
    Name    = "alb"    
  }   
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "alb_target_group" {  
  name     = "alb-target-group"  
  port     = "80"  
  protocol = "HTTP"  
  vpc_id   = "${aws_vpc.main.id}"   
  tags = {    
    name = "alb_target_group"    
  }   
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
}
#----------------------------------------------------------------------------------
resource "aws_autoscaling_attachment" "alb_autoscale" {
  alb_target_group_arn   = "${aws_lb_target_group.alb_target_group.arn}"
  autoscaling_group_name = "${aws_autoscaling_group.autoscale_group.id}"
}
#----------------------------------------------------------------------------------
resource "aws_lb_listener" "alb_listener" {  
  load_balancer_arn = "${aws_lb.alb.arn}"  
  port              = 80  
  protocol          = "HTTP"
  
  default_action {    
    target_group_arn = "${aws_lb_target_group.alb_target_group.arn}"
    type             = "forward"  
  }
}

#----------------------------------------------------------------------------------
