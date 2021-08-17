#----------------------------------------------------------------------------
# jenkins
#----------------------------------------------------------------------------
resource "aws_security_group" "jenkins-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-jenkins-sg"
  description = "security group that allows ssh and all egress traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    security_groups = ["${aws_security_group.sg-bastion.id}"]
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    security_groups = ["${aws_security_group.sg-elb-jenkins.id}"]

  }

  tags = {
    Env = terraform.workspace
  }
}
#----------------------------------------------------------------------------
