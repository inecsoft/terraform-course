## ---------------------------------------------------------------------------------------------------------------------
## CREATE AN ELB TO ROUTE TRAFFIC ACROSS THE AUTO SCALING GROUP
## ---------------------------------------------------------------------------------------------------------------------
##
#resource "aws_elb" "example" {
#  name               = "terraform-asg-example"
#  #subnets         = [aws_subnet.my_vpc_subnet_public[0].id, aws_subnet.my_vpc_subnet_public[1].id]
#  security_groups    = [aws_security_group.elb.id]
#  #availability_zones = data.aws_availability_zones.all.names
#
#  availability_zones = ["eu-west-1a"]
#
#  health_check {
#    target              = "HTTP:${var.server_port}/"
#    interval            = 30
#    timeout             = 3
#    healthy_threshold   = 2
#    unhealthy_threshold = 2
#  }
#
#  # This adds a listener for incoming HTTP requests.
#  listener {
#    lb_port           = var.elb_port
#    lb_protocol       = "http"
#    instance_port     = var.server_port
#    instance_protocol = "http"
#  }
#
#  cross_zone_load_balancing   = true
#}
#
## ---------------------------------------------------------------------------------------------------------------------
# create an elastic load balancer
#-------------------------------------------------------------------------------
resource "aws_elb" "example" {
  name            = "terraform-asg-example"
#  subnets         = [aws_subnet.main-public-1.id, aws_subnet.main-public-2.id, aws_subnet.main-3.id]
  subnets         = ["${aws_subnet.my_vpc_subnet_public[0].id}", "${aws_subnet.my_vpc_subnet_public[1].id}"]
  security_groups = [aws_security_group.elb.id]
 
  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }
  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }

  #instances = ["${aws_instance.example-instance.id}"]
  # optional you can also attach an ELB to an autoscaling group.

  cross_zone_load_balancing   = true
  connection_draining         = true
  connection_draining_timeout = 400

   tags = {
    Name = "my-elb"
  }
}

#------------------------------------------------------------------------------



