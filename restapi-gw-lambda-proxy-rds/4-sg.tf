#-------------------------------------------------------------------------------------
#connections need to be allowed to the proxy from the app.
#-------------------------------------------------------------------------------------
resource "aws_security_group" "proxy-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-allow-proxy-sg"
  description = "security group that allows traffic from the app to the proxy and all egress traffic"

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.default_name}-allow-mysql"
  }
}

#-------------------------------------------------------------------------------------
#create security group for the RDS server
#apply security_groups to allow access to RDS from other servers 
#connection need to be allow from the proxy to the db.
#-------------------------------------------------------------------------------------
resource "aws_security_group" "allow-mysql" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-allow-mysql"
  description = "allow-mysql from the proxy to the db"

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.proxy-sg.id, aws_security_group.host-bastion-sg.id] # allowing access from our example instance
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    self        = true
  }
  
  tags = {
    Name = "${local.default_name}-allow-mysql"
  }
}

#-------------------------------------------------------------------------------------
#connection from the host bastion
#-------------------------------------------------------------------------------------
resource "aws_security_group" "host-bastion-sg" {
  vpc_id      = module.vpc.vpc_id
  name        = "${local.default_name}-allow-ssh-sg"
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
    Name = "${local.default_name}-allow-ssh"
  }
}
#-------------------------------------------------------------------------------------