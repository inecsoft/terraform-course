
#-------------------------------------------------------------------------
resource "aws_instance" "storage-gateway" {
  ami           = "ami-0ae0762915a933e4d"
  #ami           = data.aws_ami.amazon_linux.id
  instance_type = "m5.xlarge" #var.instance_type # recommended m5.xlarge
  key_name      = aws_key_pair.key-pair.key_name

  # the VPC subnet
  subnet_id = module.vpc.public_subnets[0]

  # the security group
  vpc_security_group_ids = [aws_security_group.allow-ssh.id]

  associate_public_ip_address = true

  root_block_device {
    #device_name = "/dev/xvda"
    volume_type = "gp3"
    volume_size = 80
    throughput  = 125
    iops        =  3000
    delete_on_termination = true
    encrypted             = true
    kms_key_id            = aws_kms_key.kms-key.id
  }

  ebs_block_device {
    delete_on_termination = true
    device_name           = "/dev/sdb"
    encrypted             = false
    iops                  = 3000
    throughput            = 125
    volume_size           = 150
    volume_type           = "gp3"
    #kms_key_id            = aws_kms_key.kms-key.id
  }

  # user data
  #user_data = data.template_file.userdata.rendered

  #The IAM Instance Profile name to launch the instance with.
  iam_instance_profile = aws_iam_instance_profile.iam-instance-profile.name

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  /* cpu_options {
    core_count       = 2
    threads_per_core = 2
  } */

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_put_response_hop_limit = 1
    http_tokens                 = "optional"
    instance_metadata_tags      = "disabled"
  }

  enclave_options {
    enabled = false
  }

  private_dns_name_options {
    enable_resource_name_dns_a_record    = false
    enable_resource_name_dns_aaaa_record = false
    hostname_type                        = "ip-name"
  }

  connection {
    host        = self.public_ip
    user        = var.INSTANCE_USERNAME
    timeout     = "1m"
    private_key = file(var.PATH_TO_PRIVATE_KEY)
  }

  tags = {
    Name = "${local.default_name}-storage-gateway"
  }

  volume_tags = {
    Name = "${local.default_name}-storage-gateway-volume"
  }
}

#-------------------------------------------------------------------------
output "storage-gateway-public-ip" {
  description = "storage-gateway-public ip"
  value       = aws_instance.storage-gateway.public_ip
}

output "webserver-private-ip" {
  description = "webserver-private ip"
  value       = aws_instance.webserver.private_ip
}
#-------------------------------------------------------------------------