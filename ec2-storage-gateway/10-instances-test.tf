#-------------------------------------------------------------------------
data "template_file" "userdata" {
  template = file("scripts/userdata.tpl")
  vars = {
    DEVICE_IP          = aws_instance.storage-gateway.private_ip
    DEVICE_FS          = "${local.default_name}-s3-bucket-mount"
    S3FS_BUCKET_NAME   = "${local.default_name}-s3-bucket-mount"
    AWS_REGION         = var.AWS_REGION
    S3FS_MOUNTING_ROLE = aws_iam_role.iam-ec2-role.name
  }
}
#-------------------------------------------------------------------------
resource "aws_instance" "webserver" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type # recommended m5.xlarge
  key_name      = aws_key_pair.key-pair.key_name

  # the VPC subnet
  subnet_id = module.vpc.public_subnets[0]

  # the security group
  vpc_security_group_ids = [aws_security_group.allow-ssh.id]

  associate_public_ip_address = true

  root_block_device {
    #device_name = "/dev/xvda"
    volume_type = "gp2"
    volume_size = 20
    #throughput  = 125
    #iops        =  3000
    delete_on_termination = true
    encrypted             = true
    kms_key_id            = aws_kms_key.kms-key.id
  }



  # user data
  user_data = data.template_file.userdata.rendered

  #The IAM Instance Profile name to launch the instance with.
  iam_instance_profile = aws_iam_instance_profile.iam-instance-profile.name

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

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
    Name = "${local.default_name}-webserver"
  }

  volume_tags = {
    Name = "${local.default_name}-webserver-volume"
  }
}

#-------------------------------------------------------------------------
output "webserver-public-ip" {
  description = "webserver-public ip"
  value       = aws_instance.webserver.public_ip
}
#-------------------------------------------------------------------------