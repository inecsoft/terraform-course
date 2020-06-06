#-----------------------------------------------------------------------------------------------------------
resource "aws_security_group" "sg-elb-jenkins" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-sg-elb-jenkins"
  description = "security group for jenkins"

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
    cidr_blocks = [ local.workstation-external-cidr ]
    }

   ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [ local.workstation-external-cidr ] 
    description = "my ip"
   }

  tags = {
    Name = "${local.default_name}-sg-elb-jenkins"
  }
}
#-----------------------------------------------------------------------------------------------------------
