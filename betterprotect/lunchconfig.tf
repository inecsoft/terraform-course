resource "aws_launch_configuration" "ecs_launch_configuration" {
  name                 = "ecs-launch-configuration"
  image_id             = "${lookup(var.ECS_AMIS, AWS_REGION)}"
  instance_type        = "t2.micro"
  iam_instance_profile = aws_iam_instance_profile.betterproject-ecs_instance_profile.id

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
  key_name                    = "${aws_key_pair.betterproject.key_pair_name}"
  user_data                   = <<EOF
                                  #!/bin/bash
				  echo ECS_CLUSTER=${var.ecs_cluster} >> /etc/ecs/ecs.config
				  echo ECS_BACKEND_HOST= >> /etc/ecs/ecs.config;
                                  
EOF

}