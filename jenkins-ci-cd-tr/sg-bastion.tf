#----------------------------------------------------------------------------
#create security groups to allow and deny traffic to the subnets
#on port 80 for http and 22 for ssh
#protocol value "-1 " is equivalent to all protocols 
#----------------------------------------------------------------------------
resource "aws_security_group" "sg-bastion" {
  name   = "${local.default_name}-sg-bastion"
  vpc_id = module.vpc.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "${local.default_name}-sg-bastion"
  }
}

#------------------------------------------------------------------------------