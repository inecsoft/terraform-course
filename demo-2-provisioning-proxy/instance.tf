
#---------------------------------------------------------------------------------
resource "aws_instance" "bastion_proxy" {
  name =  "bastion_proxy"
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"

  # the VPC subnet
  subnet_id = aws_subnet.main-public-1.id

  # the security group
  vpc_security_group_ids = ["${aws_security_group.allow-ssh-http.id}"]
  user_data              = data.template_cloudinit_config.userdata.rendered

  associate_public_ip_address  = true
  iam_instance_profile = aws_iam_instance_profile.RCW-SSM-ServeriRoleProfile.name

  # the public SSH key
  key_name = aws_key_pair.mykeypair.key_name

  metadata_options {
    http_endpoint               = "enabled"
    http_put_response_hop_limit = 1
    http_tokens                 = "required"
    instance_metadata_tags      = "disabled"
  }

  root_block_device {
    volume_type           = "gp2"
    volume_size           = "20"
    delete_on_termination = true
    encrypted             = true
  }

  /* provisioner "file" {
    source      = "script.sh"
    destination = "/tmp/script.sh"
  }
  provisioner "remote-exec" {
    inline = [
      "chmod +x /tmp/script.sh",
      "sudo /tmp/script.sh"
    ]
  }
  connection {
    host        = self.public_ip
    user        = var.INSTANCE_USERNAME
    private_key = file("${var.PATH_TO_PRIVATE_KEY}")
  } */
  tags = {
    Name = "bastion_proxy"
  }
}

output "bastion_proxy_ip" {
  value = aws_instance.bastion_proxy.public_ip
}
#---------------------------------------------------------------------------------

data "template_file" "userdata" {
  template = file("scripts/userdata.sh")
  vars = {
    region             = var.AWS_REGION
    endpoint           = "${endpoint}"
    stackName          = "${stackName}"
    logicalId          = "${logicalId}"

  }
}


#-------------------------------------------------------------
resource "aws_iam_role" "CW-SSM-Server" {
  name               = "CW-SSM-Server"
  path               = "/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
  tags = {
    Name        = "CW-SSM-Server"
    Description = "IAM Role authorizes the instance to be use by SSM. Provides CloudWatch and SSM integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "CW-SSM-Server-policy-attachment" {
  name       = "CW-SSM-Server-policy-attachment"
  depends_on = [aws_iam_role.CW-SSM-Server]
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
  groups     = []
  users      = []
  roles      = [aws_iam_role.CW-SSM-Server.name]
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "AmazonEC2RoleforSSM-policy-attachment" {
  name       = "AmazonEC2RoleforSSM-policy-attachment"
  depends_on = [aws_iam_role.CW-SSM-Server]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
  groups     = []
  users      = []
  roles      = [aws_iam_role.CW-SSM-Server.name]
}
#-------------------------------------------------------------
resource "aws_iam_instance_profile" "RCW-SSM-ServeriRoleProfile" {
  name       = "RCW-SSM-ServerRoleProfile"
  role       = aws_iam_role.CW-SSM-Server.name
  depends_on = [ aws_iam_role.CW-SSM-Server ]
}
#------------------------------------------------------------------