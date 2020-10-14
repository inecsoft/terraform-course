#-----------------------------------------------------------------------
resource "aws_efs_file_system" "project_vpc_efs" {
  creation_token   = "project_vpc_EFS Shared Data"
  performance_mode = "generalPurpose"
  #performance_mode = "maxIO"

  #The throughput, measured in MiB/s, that you want to provision
  #for the file system. Only applicable with throughput_mode set to
  #provisioned
 
  #provisioned_throughput_in_mibps = 200 
  #throughput_mode = "provisioned"
   
  encrypted = true

  tags = {
        Name = "project_vpc_EFS Shared Data"
  }
}

#-----------------------------------------------------------------------
resource "aws_efs_mount_target" "project_vpc_efsmounttarget" {
    count = 3
    file_system_id  = "${aws_efs_file_system.project_vpc_efs.id}"
    subnet_id       =  element(module.vpc.public_subnets, count.index)
    security_groups = ["${aws_security_group.project_vpc_sg-efs.id}"]
}

#-----------------------------------------------------------------------
data "template_file" "project_vpc_efsscript" {
  template = "${file("scripts/efs.tpl")}"
    vars = {
        efs_id = "${aws_efs_file_system.project_vpc_efs.id}"
  }
}
#-----------------------------------------------------------------------