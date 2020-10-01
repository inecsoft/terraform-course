#-------------------------------------------------------------------------------------
#connections need to be allowed to the proxy from the app.
#-------------------------------------------------------------------------------------
resource "aws_security_group" "gitlab-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-allow-gitlab"
  description = "security group that allows traffic from the app to the gitlab and all egress traffic"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
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

  ingress {
    from_port   = 24922
    to_port     = 24922
    protocol    = "tcp"
    cidr_blocks = [local.workstation-external-cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.default_name}-allow-gitlab"
  }
}

#-------------------------------------------------------------------------------------
