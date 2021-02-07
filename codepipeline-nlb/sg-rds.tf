#-------------------------------------------------------------------------------------
#create security group for the RDS server
#apply security_groups to allow access to RDS from other servers 
#-------------------------------------------------------------------------------------
resource "aws_security_group" "allow-mariadb" {
  vpc_id      =  module.vpc.vpc_id
  name        = "${local.default_name}-rds-sg"
  description = "allow-mariadb"

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    #security_groups = [aws_security_group.example-instance.id] # allowing access from our example instance
    security_groups = [aws_security_group.ecs-codepipeline.id] # allowing access from our example instance
    # cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    self        = true
  }

  tags = {
    Name = "${local.default_name}-rds-sg"
  }
}

#-------------------------------------------------------------------------------------

