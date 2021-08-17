#----------------------------------------------------------------------------------
resource "aws_security_group" "codepipeline-lb-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-alb-sg"
  description = "security group for alb-asg"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.default_name}-alb-sg"
  }
}

#----------------------------------------------------------------------------------