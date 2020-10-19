#-----------------------------------------------------------------------
resource "aws_efs_file_system" "efs" {
  creation_token   = "EFS Shared Data"
  performance_mode = "generalPurpose"
  #performance_mode = "maxIO"

  #The throughput, measured in MiB/s, that you want to provision
  #for the file system. Only applicable with throughput_mode set to
  #provisioned
 
  #provisioned_throughput_in_mibps = 200 
  #throughput_mode = "provisioned"

  tags = {
    Name = "${local.default_name}-efs-shared-data"
  }
}
#-----------------------------------------------------------------------
resource "aws_efs_mount_target" "efs" {
  count = 3
  file_system_id  = aws_efs_file_system.efs.id
  subnet_id       = element(module.vpc.public_subnets, count.index)
  security_groups = [ aws_security_group.ingress-efs.id ]
}
#-----------------------------------------------------------------------
data "template_file" "script" {
  template = "${file("scripts/script.tpl")}"
    vars = {
      efs_id = "${aws_efs_file_system.efs.id}"
      cluster_name = "{local.default_name}-ecs"
  }
}
#-----------------------------------------------------------------------


