data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}


resource "aws_security_group" "suluq_vpc_sg-bastion" {
  name_prefix = "${local.default_name}-bastion-servers"
  description = "bastion for application servers"
  vpc_id      = module.vpc.vpc_id


  ingress {
    #security_groups = ["${aws_security_group.suluq_vpc_sg-bastion.id}"]
    from_port = 22 
    to_port = 22
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    #security_groups = ["${aws_security_group.suluq_vpc_sg-bastion.id}"]
    from_port = 80 
    to_port = 80
    protocol = "TCP"
    cidr_blocks = [local.workstation-external-cidr]
  }

  egress {
    #security_groups = ["${aws_security_group.suluq_inchora_vpc_sg-bastion.id}"]
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
   }

  tags = {
    Name =  "${local.default_name}_vpc_sg-bastion"

  }

}

