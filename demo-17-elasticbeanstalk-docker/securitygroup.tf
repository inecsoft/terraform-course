#----------------------------------------------------------
#create security group for the production app environment
#----------------------------------------------------------
resource "aws_security_group" "app-prod" {
  vpc_id      = aws_vpc.main.id
  name        = "application - production"
  description = "security group for my app"
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
    Name = "myinstance"
  }
}

#-----------------------------------------------------------------------------------
#create security group for the database postgresdb
#----------------------------------------------------------------------------------
resource "aws_security_group" "allow-postgresdb" {
  vpc_id      = aws_vpc.main.id
  name        = "allow-postgresdb"
  description = "allow-postgresdb"
  ingress {
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.app-prod.id] # allowing access from our example instance
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    self        = true
  }
  tags = {
    Name = "allow-postgresdb"
  }
}

#-----------------------------------------------------------------------------------------------
