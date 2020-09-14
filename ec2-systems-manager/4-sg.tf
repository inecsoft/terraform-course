#-------------------------------------------------------------------------------------
#connections need to be allowed to the proxy from the app.
#-------------------------------------------------------------------------------------
resource "aws_security_group" "ApplicationHostSecurityGroup" {
  vpc_id      = module.vpc.vpc_id
  name        = "${terraform.workspace}-ApplicationHostSecurityGroup"
  description = "Allow SSH from Management VPC"

  egress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    cidr_blocks     = ["0.0.0.0/0"]
  }


  tags = {
    Name = "${local.default_name}-ApplicationHostSecurityGroup"
  }
}

#-------------------------------------------------------------------------------------
resource "aws_security_group" "ApplicationNatSecurityGroup" {
  vpc_id      = module.vpc.vpc_id
  name        = "${terraform.workspace}-ApplicationNatSecurityGroup"
  description = "Application NAT Security Group Allow outbound HTTPS traffic"

  ingress {
    from_port       = 443
    to_port         = 443
    protocol        = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    #security_groups = [aws_security_group.proxy-sg.id, aws_security_group.host-bastion-sg.id] # allowing access from our example instance
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  
  tags = {
    Name = "${local.default_name}-allow-mysql"
  }
}

#-------------------------------------------------------------------------------------
