##################################################################
#security group for Application Load Balancer
##################################################################
#----------------------------------------------------------------------------------------------
resource "aws_security_group" "sg-elb-app" {
  name_prefix = "${local.default_name}-elb-sg"
  description = "elb for application servers"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 80
    to_port = 80
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    #security_groups = ["${aws_security_group.sg-bastion.id}"]
    from_port = 443
    to_port = 443
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
   }

  tags = {
    Name =  "${local.default_name}-sg-elb-app"
  }
}
#----------------------------------------------------------------------------------------------

