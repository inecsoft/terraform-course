#-----------------------------------------------------------------------
resource "aws_instance" "instance_client" {
  depends_on      = [  aws_key_pair.key-pair_client ]
  provider        = aws.client
  ami             = data.aws_ami.amazon_linux_kernel_5.id
  instance_type   = var.instance_type
  subnet_id       = element(aws_subnet.vpc_subnet_public_client.*.id, 0)
  key_name        = aws_key_pair.key-pair_client.key_name
  source_dest_check         = false
  associate_public_ip_address = true

  user_data = data.template_file.script.rendered
  #user_data       = "${data.template_file.project_vpc_efsscript.rendered}"

  #change the security group to private by using different file
  vpc_security_group_ids = [ aws_security_group.security_group_client.id ]

  tags = {
    Name      = "client"
    CI        = "terraform"
  }

  volume_tags = {
    Name      = "client"
    CI        = "terraform"
  }
}

resource "aws_eip" "eip" {
  provider = aws.client
  instance = aws_instance.instance_client.id
  domain   = "vpc"

  tags = {
    "Name" = "openswan-eip"
  }

  tags_all = {
    "Name" = "openswan-eip"
  }
}

data "template_file" "script" {
  template = file("scripts/userdata.tpl")
  vars = {
    VPC_CIDR_BLOCK_CLIENT       = "${var.vpc_cidr_client}"
    VPC_CIDR_BLOCK_MAIN         = "${var.vpc_cidr_main}"
    # does not work because of Cycle:
    /* PUBLIC_IP_VGW_TUNNEL_1      = "${aws_vpn_connection.vpn_connection.tunnel1_address}"
    PUBLIC_IP_VGW_TUNNEL_2      = "${aws_vpn_connection.vpn_connection.tunnel2_address}" */

  }
}
#-----------------------------------------------------------------------
output "instance_client_public_ip" {
  value = aws_instance.instance_client.public_ip
}

#-----------------------------------------------------------------------
output "instance_client_public_public_dns" {
  value = aws_instance.instance_client.public_dns
}
/* #-----------------------------------------------------------------------
resource "aws_instance" "instance_client_test" {
  depends_on = [  aws_key_pair.key-pair_client ]
  provider = aws.client
  ami = data.aws_ami.amazon_linux_kernel_5.id
  instance_type   = var.instance_type
  subnet_id       = module.vpc1.public_subnets[0] #module.vpc.private_subnets[1]
  key_name        = aws_key_pair.key-pair_client.key_name
  associate_public_ip_address = false
  #user_data       = "${data.template_file.project_vpc_efsscript.rendered}"
  #change the security group to private by using different file
  vpc_security_group_ids = [ aws_security_group.security_group_client.id ]

  tags = {
    Name      = "client_test"
    CI        = "terraform"
  }

  volume_tags = {
    Name      = "client_test"
    CI        = "terraform"
  }
}


#-----------------------------------------------------------------------
output "instance_client_test_public_ip" {
  value = aws_instance.instance_client_test.public_ip
}
*/#-----------------------------------------------------------------------
#-----------------------------------------------------------------------
resource "aws_instance" "instance_main" {
  provider        = aws.main
  depends_on = [  aws_key_pair.key-pair_main ]
  ami             = data.aws_ami.amazon_linux_kernel_5.id
  instance_type   = var.instance_type
  subnet_id       = element(aws_subnet.vpc_subnet_private_main.*.id, 0)
  key_name        = aws_key_pair.key-pair_main.key_name
  associate_public_ip_address = false
  #user_data       = "${data.template_file.project_vpc_efsscript.rendered}"
  #change the security group to private by using different file
  vpc_security_group_ids = [ aws_security_group.security_group_main.id ]

  tags = {
    Name      = "main"
    CI        = "terraform"
  }

  volume_tags = {
    Name      = "main"
    CI        = "terraform"
  }
}
#-----------------------------------------------------------------------
output "instance_main_public_ip" {
  value = aws_instance.instance_main.public_ip
}
#-----------------------------------------------------------------------
