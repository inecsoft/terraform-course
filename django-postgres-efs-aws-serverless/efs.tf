resource "aws_security_group" "efs_sg" {
  name        = "EFS Security Group"
  description = "Allow ECS to EFS communication"
  vpc_id      = aws_vpc.ecs_vpc.id

  ingress {
    from_port   = 2049  # NFS port
    to_port     = 2049
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Modify this based on your security requirements
  }
}

resource "aws_efs_file_system" "efs" {
  lifecycle_policy {
    transition_to_ia = "AFTER_30_DAYS"
  }
}

resource "aws_efs_access_point" "app_access_point" {
  file_system_id = aws_efs_file_system.efs.id
  posix_user {
    uid = 1000
    gid = 1000
  }
  root_directory {
    path = "/efs"
    creation_info {
      owner_uid   = 1000
      owner_gid   = 1000
      permissions = "755"
    }
  }
}

resource "aws_efs_mount_target" "efs_mount" {
  count           = length(aws_subnet.ecs_subnets_public.*.id )
  depends_on      = [ aws_subnet.ecs_subnets_public ]
  file_system_id  = aws_efs_file_system.efs.id
  subnet_id       = "${aws_subnet.ecs_subnets_public[count.index].id}"
  security_groups = [aws_security_group.efs_sg.id]
}