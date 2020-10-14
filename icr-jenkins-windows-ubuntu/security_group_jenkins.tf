# jenkins
resource "aws_security_group" "project_vpc-jenkins-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "project-vpc-jenkins-sg"
  description = "security group that allows ssh and all egress traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    
  }

  ingress {
    security_groups = ["${aws_security_group.project_vpc_sg-bastion.id}"]
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    security_groups = ["${aws_security_group.project-sg-elb-jenkins.id}"]

  }

  tags = {
    Name = "project-vpc-jenkins-sg"
  }
}