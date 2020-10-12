#// security.tf
#------------------------------------------------------------------------------
resource "aws_security_group" "suluq_vpc_sg-efs" {
   name = "${local.default_name}_vpc_sg-efs"
   vpc_id = module.vpc.vpc_id

#         // NFS
    ingress {
      security_groups = ["${aws_security_group.suluq_vpc_sg-bastion.id}", "${aws_security_group.app_servers.id}"]
      from_port = 2049
      to_port = 2049
      protocol = "tcp"
   }

#      // Terraform removes the default rule
   egress {
     security_groups = ["${aws_security_group.suluq_vpc_sg-bastion.id}"]
     from_port = 0
     to_port = 0
     protocol = "-1"
        }

    tags = {
      Name =  "${local.default_name}_vpc_sg-efs_security_group"

  }

}