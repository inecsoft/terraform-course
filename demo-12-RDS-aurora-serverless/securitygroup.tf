#-------------------------------------------------------------------------------------
resource "aws_security_group" "mgmt-instance" {
  vpc_id      = aws_vpc.main.id
  name        = "allow-ssh"
  description = "security group that allows ssh and all egress traffic"
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  tags = {
    Name = "mgmt-instance"
  }
}

#-------------------------------------------------------------------------------------
#create security group for the RDS server
#apply security_groups to allow access to RDS from other servers 
#-------------------------------------------------------------------------------------
resource "aws_security_group" "allow-aurora-serverless" {
  vpc_id      = aws_vpc.main.id
  name        = "allow-aurora-serverless"
  description = "allow-aurora-serverless"
  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.mgmt-instance.id] # allowing access from our example instance
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    self        = true
  }
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "allow-aurora-serverless"
  }
}

#-------------------------------------------------------------------------------------

