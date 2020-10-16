#------------------------------------------------------------
resource "aws_security_group" "sg-web" {
  name        = "${local.default_name}-asg-sg"
  description = "Used for autoscale group"
  vpc_id      = module.vpc.vpc_id

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    #stop the server to be exposed to the internet on port 80
    security_groups = [ aws_security_group.lb-sg.id ]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.default_name}-asg-sg"
  }
}
#------------------------------------------------------------
resource "aws_security_group" "lb-sg" {
  name        = "${local.default_name}-lb-sg"
  vpc_id      = module.vpc.vpc_id
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
 
  tags = {
    Name = "${local.default_name}-lb-sg"
  }
}
#------------------------------------------------------------#------------------------------------------------------------------------------

#// security.tf
resource "aws_security_group" "ingress-efs" {
   name = "${local.default_name}-ingress-efs-test-sg"
   vpc_id = module.vpc.vpc_id

    #         // NFS
    ingress {
      security_groups = ["${aws_security_group.sg-web.id}"]
      from_port = 2049
      to_port = 2049
      protocol = "tcp"
   }

    #      // Terraform removes the default rule
    egress {
        security_groups = [ aws_security_group.sg-web.id ]
        from_port = 0
        to_port = 0
        protocol = "-1"
    }

   tags = {
    Name = "${local.default_name}-ingress-efs-test-sg"
  }
}
#------------------------------------------------------------------------------

