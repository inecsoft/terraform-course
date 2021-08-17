# jenkins
resource "aws_security_group" "project_vpc-ubuntu-mysql-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "project_vpc-ubuntu-mysql-sg"
  description = "security group that allows ssh,mysql and all egress traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    security_groups = ["${aws_security_group.project_vpc_sg-bastion.id}"]
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]

  }

  ingress {
    from_port = 3306
    to_port   = 3306
    protocol  = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    security_groups = ["${aws_security_group.project_vpc_sg-bastion.id}"]

  }

  tags = {
    Name = "project-vpc-ubuntu-mysql-sg"
  }
}