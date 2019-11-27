#------------------------------------------------------------
resource "aws_security_group" "sec_web" {
  name        = "sec_web"
  description = "Used for autoscale group"
  vpc_id      = "${aws_vpc.main.id}"

  # HTTP access from anywhere
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    #cidr_blocks = ["0.0.0.0/0"]
    #stop the server to be exposed to the internet on port 80
    security_groups = ["${aws_security_group.sec_lb.id}"]
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
}
#------------------------------------------------------------
resource "aws_security_group" "sec_lb" {
  name = "sec_elb"
  vpc_id      = "${aws_vpc.main.id}"
  
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
}
#------------------------------------------------------------#------------------------------------------------------------------------------

#// security.tf
resource "aws_security_group" "ingress-efs" {
   name = "ingress-efs-test-sg"
   vpc_id = "${aws_vpc.main.id}"

#         // NFS
    ingress {
      security_groups = ["${aws_security_group.sec_web.id}"]
      from_port = 2049
      to_port = 2049
      protocol = "tcp"
   }

#      // Terraform removes the default rule
   egress {
     security_groups = ["${aws_security_group.sec_web.id}"]
     from_port = 0
     to_port = 0
     protocol = "-1"
        }
}
#------------------------------------------------------------------------------

