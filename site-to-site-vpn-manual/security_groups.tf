#create security groups to allow and deny traffic to the subnets
#on port 80 for http and 22 for ssh
#protocol value "-1 " is equivalent to all protocols
#----------------------------------------------------------------------------
resource "aws_security_group" "security_group_main" {
  name = "security_group_main"
  vpc_id = aws_vpc.vpc_main.id
  provider = aws.main

  ingress {
    from_port = 22
    to_port = 22
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "allow ssh traffic"
  }

  ingress    {
    cidr_blocks      = [
      "10.1.0.0/16",
    ]
    description      = ""
    from_port        = 0
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "tcp"
    security_groups  = []
    self             = false
    to_port          = 65535
  }

  ingress {
    from_port       = -1
    to_port         = -1
    protocol        = "icmp"
    cidr_blocks     = ["0.0.0.0/0"]
    description     = "allow icmp traffic"
  }

  ingress    {
    cidr_blocks      = []
    description      = "allow ssh traffic IPv6"
    from_port        = 22
    ipv6_cidr_blocks = [
      "::/0",
    ]
    prefix_list_ids  = []
    protocol         = "TCP"
    security_groups  = []
    self             = false
    to_port          = 22
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "allow all traffic out"

  }

  tags = {
    Name =  "security_group_main"
  }
}

#--------------------------------------------------------

resource "aws_security_group" "security_group_client" {
  name = "security_group_client"
  vpc_id = aws_vpc.vpc_client.id
  provider = aws.client

  ingress {
    from_port       = -1
    to_port         = -1
    protocol        = "icmp"
    cidr_blocks     = ["0.0.0.0/0"]
    description     = "allow icmp traffic"
  }

  ingress  {
    cidr_blocks      = [
      "10.2.0.0/16",
    ]
    description      = ""
    from_port        = 0
    ipv6_cidr_blocks = []
    prefix_list_ids  = []
    protocol         = "tcp"
    security_groups  = []
    self             = false
    to_port          = 65535
  }

  ingress    {
    cidr_blocks      = []
    description      = "allow icmp traffic IPv6"
    from_port        = -1
    ipv6_cidr_blocks = [
      "::/0",
    ]
    prefix_list_ids  = []
    protocol         = "icmpv6"
    security_groups  = []
    self             = false
    to_port          = -1
  }

  ingress {
    from_port = 22
    to_port = 22
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
    description = "allow ssh traffic"
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "allow all traffic out"
  }

  tags = {
    Name =  "security_group_client"
  }
}
#--------------------------------------------------------