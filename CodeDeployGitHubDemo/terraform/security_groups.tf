#----------------------------------------------------------------------------
#create security groups to allow and deny traffic to the subnets
#on port 80 for http and 22 for ssh
#protocol value "-1 " is equivalent to all protocols 
#----------------------------------------------------------------------------
resource "aws_security_group" "my_security_group" {
  name = "my_security_group"
  vpc_id = "${aws_vpc.my_vpc.id}"
  ingress {
    from_port = 22
    to_port = 22
    protocol = "TCP"
    #cidr_blocks = ["0.0.0.0/0"]
    cidr_blocks       = [local.workstation-external-cidr]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"] 

  }
  tags = {
    Name =  "ssh_security_group"

  }
}
#------------------------------------------------------------------------------
resource "aws_security_group" "http_security_group" {
  name = "http:q_security_group"
  vpc_id = "${aws_vpc.my_vpc.id}"
  ingress {
    from_port = 80 
    to_port = 80
    protocol = "HTTP"
    #cidr_blocks = ["0.0.0.0/0"]
    cidr_blocks       = [local.workstation-external-cidr]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"] 

  }
  tags = {
    Name =  "http_security_group"

  }
}
#------------------------------------------------------------------------------
#// security.tf
resource "aws_security_group" "ingress-efs" {
   name = "ingress-efs-test-sg"
   vpc_id = "${aws_vpc.my_vpc.id}"

#         // NFS
    ingress {
      security_groups = ["${aws_security_group.my_security_group.id}"]
      from_port = 2049
      to_port = 2049
      protocol = "tcp"
   }

#      // Terraform removes the default rule
   egress {
     security_groups = ["${aws_security_group.my_security_group.id}"]
     from_port = 0
     to_port = 0
     protocol = "-1"
        }
    tags = {
       Name = "ingress-efs"
  }
}
#------------------------------------------------------------------------------

