#-----------------------------------------------------------------------
resource "aws_instance" "instance" {
  ami = "${lookup(var.AMIS, var.AWS_REGION)}"
  instance_type   = "${var.instance_type}"
  subnet_id       = "${aws_subnet.my_vpc_subnet_public[0].id}"
  #subnet_id       = "${aws_subnet.my_vpc_subnet_private[0].id}"
  key_name        = "${aws_key_pair.mykey.key_name}"
  user_data       = "${data.template_file.script.rendered}"
  #change the security group to private by using different file
  vpc_security_group_ids = ["${aws_security_group.my_security_group.id}"]

  tags = {
        Name      = "EFS_TEST"
        Terraform = "true"
      }
  volume_tags = {
          Name      = "EFS_TEST_ROOT"
          Terraform = "true"
      }
}

#-----------------------------------------------------------------------
resource "aws_efs_file_system" "efs" {
  creation_token   = "EFS Shared Data"
  performance_mode = "generalPurpose"
  tags = {
        Name = "EFS Shared Data"
  }
}

#-----------------------------------------------------------------------
resource "aws_efs_mount_target" "efs" {
    file_system_id  = "${aws_efs_file_system.efs.id}"
    subnet_id       = "${aws_subnet.my_vpc_subnet_public[0].id}"
    security_groups = ["${aws_security_group.ingress-efs.id}"]
}

#-----------------------------------------------------------------------
data "template_file" "script" {
  template = "${file("script.tpl")}"
    vars = {
        efs_id = "${aws_efs_file_system.efs.id}"
  }
}
#-----------------------------------------------------------------------


