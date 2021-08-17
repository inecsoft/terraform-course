#--------------------------------------------------------------
resource "aws_launch_configuration" "lc" {
  name     = "${local.default_name}-lc"
  image_id = data.aws_ami.amazon_linux.id

  instance_type   = "t2.nano"
  security_groups = [aws_security_group.sg-web.id]
  key_name        = aws_key_pair.key-pair.id

  #associate_public_ip_address = true
  iam_instance_profile = aws_iam_instance_profile.instance-RoleProfile.name
  user_data            = data.template_file.script.rendered

  #user_data = <<-EOF
  #            #!/bin/bash
  #            sudo apt-get -y update
  #            sudo apt-get -y install nginx
  #            EOF

  lifecycle {
    create_before_destroy = true
  }
}
#--------------------------------------------------------------
resource "aws_autoscaling_group" "asg" {
  name                 = "${local.default_name}-asg-alb"
  launch_configuration = aws_launch_configuration.lc.id
  vpc_zone_identifier  = module.vpc.public_subnets

  #A list of elastic load balancer names to add to the autoscaling group names.
  #Only valid for classic load balancers. For ALBs, use target_group_arns instead.
  #load_balancers = ["${aws_elb.elb.name}"]

  #target_group_arns = [ aws_lb.alb.arn ]

  force_delete     = true
  min_size         = 1
  max_size         = 3
  desired_capacity = 1

  tag {
    key                 = "Name"
    value               = "${local.default_name}-lc"
    propagate_at_launch = true
  }

}
#-------------------------------------------------------------------------------------------------------------------------------------
resource "aws_autoscaling_notification" "example_notifications" {
  group_names = [
    aws_autoscaling_group.asg.name,

  ]

  notifications = [
    "autoscaling:EC2_INSTANCE_LAUNCH",
    "autoscaling:EC2_INSTANCE_TERMINATE",
    "autoscaling:EC2_INSTANCE_LAUNCH_ERROR",
    "autoscaling:EC2_INSTANCE_TERMINATE_ERROR",
  ]

  topic_arn = aws_sns_topic.sns-topic-asg-notification.arn
}
#----------------------------------------------------------------------------------------
resource "aws_sns_topic" "sns-topic-asg-notification" {
  name         = "${local.default_name}-asg-notification"
  display_name = "${local.default_name}-asg-notification"
  policy       = <<POLICY
{
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Sid": "__default_statement_ID",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish",
        "SNS:Receive"
      ],
      "Resource": "arn:aws:sns:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:${local.default_name}-asg-notification",
      "Condition": {
        "StringEquals": {
          "AWS:SourceOwner": "${data.aws_caller_identity.current.account_id}"
        }
      }
    }
  ]
}
POLICY

  tags = {
    Name = "${local.default_name}-ses-notification"

  }
}
#----------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "sns-topic-subscription-asg-sns" {
  #provider  = "aws.sns"
  topic_arn                       = aws_sns_topic.sns-topic-asg-notification.arn
  confirmation_timeout_in_minutes = 5
  protocol                        = "sms"
  endpoint                        = "+447518527690"
  raw_message_delivery            = false
}
#-------------------------------------------------------------------------------