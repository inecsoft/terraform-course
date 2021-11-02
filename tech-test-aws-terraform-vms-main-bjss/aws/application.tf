resource "aws_lb" "alb" {
  name            = "alb"
  subnets         = [ aws_subnet.public[0].id, aws_subnet.public[1].id, aws_subnet.public[2].id ]
  security_groups = [aws_security_group.alb_sg.id]
  internal        = false
  idle_timeout    = 60

  tags = {
    Name = var.candidate
  }
}

output "alb_dns_name" {
  value = aws_lb.alb.dns_name
}
#----------------------------------------------------------------------------------
resource "aws_lb_target_group" "alb_target_group" {
  name     = "${var.candidate}-alb-target-group"
  port     = "80"
  protocol = "HTTP"
  # target_type = "ip"
  vpc_id   = aws_vpc.vpc.id


  stickiness {
    type            = "lb_cookie"
    cookie_duration = 1800
    enabled         = true
  }
  
  health_check {
    healthy_threshold   = 3
    unhealthy_threshold = 10
    timeout             = 5
    interval            = 10
    path                = "/"
    port                = 80
  }

  tags = {
    Name = var.candidate
  }
}
#----------------------------------------------------------------------------------
resource "aws_autoscaling_attachment" "alb_asg_attach" {
  alb_target_group_arn   = aws_lb_target_group.alb_target_group.arn
  autoscaling_group_name = aws_autoscaling_group.asg.id
}
#----------------------------------------------------------------------------------
resource "aws_lb_listener" "alb_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.alb_target_group.arn
    type             = "forward"
  }
  
  tags = {
    Name = var.candidate
  }
}

#----------------------------------------------------------------------------------


resource "aws_autoscaling_group" "asg" {
  name                      = "${var.candidate}-frontend"
  max_size                  = 3
  min_size                  = 1 #var.min_size
  desired_capacity          = 1
  health_check_grace_period = 300
  health_check_type         = "EC2"
  # vpc_zone_identifier       = [ aws_subnet.public[0].id, aws_subnet.public[1].id, aws_subnet.public[2].id ]
  vpc_zone_identifier       = [ aws_subnet.private[0].id, aws_subnet.private[1].id, aws_subnet.private[2].id ]
  
  launch_template {
    id      = aws_launch_template.frontend.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = var.candidate
    propagate_at_launch = true
  }
}

resource "aws_launch_template" "frontend" {
  name          = "${var.candidate}-frontend"
  image_id      = data.aws_ami.amazon_linux.id # TODO: Work out the Amazon Linux 2 AMI ID
  instance_type = "t2.micro"

  user_data = filebase64("${path.module}/scripts/bootstrap.sh")

  iam_instance_profile {
    name = aws_iam_instance_profile.node.name
  }

  network_interfaces {
    associate_public_ip_address = true
    security_groups = [
      aws_security_group.node.id,
      aws_security_group.alb_sg.id
    ]
  }

  tag_specifications {
    resource_type = "volume"
    tags = {
      Name = var.candidate
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = var.candidate
    }
  }

  tags = {
    Name = var.candidate
  }
}

resource "aws_iam_instance_profile" "node" {
  name = "${var.candidate}_instance_profile"
  role = aws_iam_role.node.name

  tags = {
    Name = var.candidate
  }
}

resource "aws_iam_role" "node" {
  name = "${var.candidate}_node"
  path = "/"

  assume_role_policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "sts:AssumeRole",
            "Principal": {
               "Service": "ec2.amazonaws.com"
            },
            "Effect": "Allow",
            "Sid": ""
        }
    ]
}
EOF

  tags = {
    Name = var.candidate
  }
}

resource "aws_iam_role_policy_attachment" "node" {
  role       = aws_iam_role.node.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_security_group" "node" {
  vpc_id = aws_vpc.vpc.id
  name   = "${var.candidate}-node"

  tags = {
    Name = var.candidate
  }
}
resource "aws_security_group" "alb_sg" {
  name        = "${var.candidate}_alb_sg"
  description = "Allow TLS inbound traffic"
  vpc_id      = aws_vpc.vpc.id

  ingress {
    description = "TLS from VPC"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = var.candidate
  }
}
resource "aws_security_group_rule" "node_ingress" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.node.id
}

resource "aws_security_group_rule" "node_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "all"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.node.id
}
