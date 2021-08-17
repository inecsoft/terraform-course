#----------------------------------------------------------------------------------------------
resource "aws_security_group" "sg-app" {
  description = "sg for application servers"
  vpc_id      = module.vpc.vpc_id

  ingress {
    security_groups = ["${aws_security_group.sg-bastion.id}"]
    from_port       = 22
    to_port         = 22
    protocol        = "TCP"
  }

  ingress {
    security_groups = ["${aws_security_group.sg-elb-app.id}"]
    from_port       = 80
    to_port         = 80
    protocol        = "TCP"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.default_name}-sg-app"
  }
}
#----------------------------------------------------------------------------------------------
