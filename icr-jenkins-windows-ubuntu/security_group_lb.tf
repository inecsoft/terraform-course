resource "aws_security_group" "project-sg-elb-jenkins" {
  vpc_id      = module.vpc.vpc_id
  name        = "project-sg-elb-jenkins"
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
    cidr_blocks = ["213.106.59.197/32"]
    }

   ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["213.106.59.197/32","195.206.189.94/32","164.39.170.178/32"] #Grantham, Norwich ip
    description = "Grantham, Norwich ip"
   }

   ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["172.10.231.190/32","88.106.16.138/32","49.248.148.242/32","82.17.172.50/32"] 
    description = "daryn"
   }
   
  tags = {
    Name = "project-sg-elb-jenkins"
  }
}