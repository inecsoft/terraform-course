resource "aws_launch_configuration" "ecs_launch_configuration" {
  name                 = "ecs-launch-configuration"
  image_id             = data.aws_ami.amazon_ecs.id
  instance_type        = "t3.micro"
  iam_instance_profile = aws_iam_instance_profile.ecs_instance_profile.id

  root_block_device {
    volume_type           = "standard"
    volume_size           = 30
    delete_on_termination = true
  }

  lifecycle {
    create_before_destroy = true
  }

  security_groups             = [aws_security_group.ecs_security_group.id]
  associate_public_ip_address = "true"
  key_name                    = aws_key_pair.key-pair.key_name
  user_data                   = <<EOF
    #!/bin/bash
    echo ECS_CLUSTER=${var.ecs_cluster} >> /etc/ecs/ecs.config
    echo ECS_BACKEND_HOST= >> /etc/ecs/ecs.config;

EOF

}

