#-------------------------------------------------------------------------------
#create security group to access the instance on ssh
#-------------------------------------------------------------------------------
resource "aws_security_group" "allow-ssh" {
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
    Name = "allow-ssh"
  }
}

#------------------------------------------------------------------------------------
#For EFS I create another security group that allows inbound traffic 
#on port 2049 (the NFSv4 port), allows egress traffic on any port.
#By setting the ingress-efs resource security_groups attribute to allow-ssh,
#this only allows network traffic to and from VMs in the allow-ssh security group
#to talk to the EFS volume.
#------------------------------------------------------------------------------------
#// security.tf
resource "aws_security_group" "ingress-efs" {
  name   = "ingress-efs-test-sg"
  vpc_id = aws_vpc.main.id

  #         // NFS
  ingress {
    security_groups = [aws_security_group.allow-ssh.id]
    from_port       = 2049
    to_port         = 2049
    protocol        = "tcp"
  }

  #      // Terraform removes the default rule
  egress {
    security_groups = [aws_security_group.allow-ssh.id]
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
  }
}
#------------------------------------------------------------------------------

