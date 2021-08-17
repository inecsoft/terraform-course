

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A LAUNCH CONFIGURATION THAT DEFINES EACH EC2 INSTANCE IN THE ASG
# ---------------------------------------------------------------------------------------------------------------------

resource "aws_launch_configuration" "example" {
  # Ubuntu Server 18.04 LTS (HVM), SSD Volume Type in eu-west-1
  image_id        = "ami-06358f49b5839867c"
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.instance.id]

  user_data = <<-EOF
              #!/bin/bash
              echo "Hello, World" > index.html
              nohup busybox httpd -f -p "${var.server_port}" &
              EOF

  # Whenever using a launch configuration with an auto scaling group, you must set create_before_destroy = true.
  # https://www.terraform.io/docs/providers/aws/r/launch_configuration.html
  lifecycle {
    create_before_destroy = true
  }
}
# ---------------------------------------------------------------------------------------------------------------------
# CREATE THE AUTO SCALING GROUP
# ---------------------------------------------------------------------------------------------------------------------

resource "aws_autoscaling_group" "example" {
  launch_configuration = aws_launch_configuration.example.id
  availability_zones   = data.aws_availability_zones.all.names
  vpc_zone_identifier  = [aws_subnet.my_vpc_subnet_public[0].id, aws_subnet.my_vpc_subnet_public[1].id, aws_subnet.my_vpc_subnet_public[2].id]

  min_size = 1
  max_size = 2

  load_balancers    = [aws_elb.example.name]
  health_check_type = "ELB"
  force_delete      = true

  tag {
    key                 = "Name"
    value               = "terraform-asg-example"
    propagate_at_launch = true
  }
}


#------------------------------------------------------------------------------------------------------------
