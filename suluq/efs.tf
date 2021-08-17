#-----------------------------------------------------------------------
resource "aws_efs_file_system" "suluq_vpc_efs" {
  creation_token   = "suluq_vpc_EFS Shared Data"
  performance_mode = "generalPurpose"
  #performance_mode = "maxIO"

  #The throughput, measured in MiB/s, that you want to provision
  #for the file system. Only applicable with throughput_mode set to
  #provisioned

  #provisioned_throughput_in_mibps = 200
  #throughput_mode = "provisioned"

  lifecycle_policy {

    transition_to_ia = "AFTER_90_DAYS"
  }

  encrypted = true

  tags = {
    Name = "${local.default_name}-vpc_EFS Shared Data"
  }
}

#-----------------------------------------------------------------------
resource "aws_efs_mount_target" "suluq_inchora_vpc_efsmounttarget" {
  count           = 3
  file_system_id  = aws_efs_file_system.suluq_vpc_efs.id
  subnet_id       = element(module.vpc.public_subnets, count.index)
  security_groups = ["${aws_security_group.suluq_vpc_sg-efs.id}"]
}

#-----------------------------------------------------------------------
data "template_file" "suluq_vpc_efsscript" {
  template = file("scripts/efs.tpl")
  vars = {
    efs_id = "${aws_efs_file_system.suluq_vpc_efs.id}"
  }
}
#-----------------------------------------------------------------------
output "efs-id" {
  value = aws_efs_file_system.suluq_vpc_efs.id
}
#-----------------------------------------------------------------------
