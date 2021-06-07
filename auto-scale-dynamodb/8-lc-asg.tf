#-------------------------------------------------------------------------------------------
data "template_file" "script" {
  template = file("scripts/userdata.sh")
  vars = {
    s3_bucket_name = "${aws_s3_bucket.s3-bucket-dynamodb-backup.id}",
    aws_region     = "${var.AWS_REGION}"
  }
}
#---------------------------------------------------------------------------------------------------------
resource "aws_launch_configuration" "lc" {
  name          = "${local.default_name}-${random_pet.this.id}-lc"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  key_name      = aws_key_pair.key-pair.key_name

  associate_public_ip_address = true
  enable_monitoring           = false
  ebs_optimized               = false

  #Spot Instances
  #two simple rules:
  # 1. Spot pools have separete prices and changes less frequently.
  # 2. Amazon EC2 will give you a 2 minute warnning when we need the capacity back.

  #spot_price                  = "0.001"

  user_data = data.template_file.script.rendered
  #change the security group to private by using different file
  security_groups = [aws_security_group.dynamodb-sg.id]

  iam_instance_profile = aws_iam_instance_profile.iam-instance-profile.name

  root_block_device {
    delete_on_termination = true
    encrypted             = false
    iops                  = 100
    volume_size           = 10
    volume_type           = "gp2"
  }

  lifecycle {
    create_before_destroy = true
  }
}
#-------------------------------------------------------------------------------------------
resource "aws_autoscaling_group" "dynamo-asg" {
  name = "${local.default_name}-dynamo-asg"

  #availability_zones        = slice(data.aws_availability_zones.azs.names, 0, 3)
  vpc_zone_identifier = module.vpc.public_subnets

  desired_capacity          = 1
  health_check_grace_period = 0
  health_check_type         = "EC2"
  launch_configuration      = aws_launch_configuration.lc.name
  max_size                  = 1
  min_size                  = 1
  default_cooldown          = 300

  force_delete = true

  lifecycle {
    create_before_destroy = true
  }

  tag {
    key                 = "Name"
    value               = "${local.default_name}-dynamo-asg"
    propagate_at_launch = true
  }
}
#-------------------------------------------------------------------------------------------
