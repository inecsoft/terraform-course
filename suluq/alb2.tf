resource "aws_route53_record" "zuluq_inchora_r53_r" {
    zone_id = "ZMJ42EAN5RJQI"
    #name = roadtohealth.inchoratech.com
    name = "roadtohealth"
    type = "A"

    alias {
      name                   = "${aws_lb.alb.dns_name}"
      zone_id                = "${aws_lb.alb.zone_id}"
      evaluate_target_health = true
    }
}
output "aws_route53_record" {
  value = "${aws_route53_record.zuluq_inchora_r53_r.fqdn}"
}
##################################################################
# ssl certificte for the domain
##################################################################
module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> 2.0"

  domain_name = var.domain # trimsuffix(data.aws_route53_zone.this.name, ".") # Terraform >= 0.12.17
  zone_id = "ZMJ42EAN5RJQI"
  //zone_id      = aws_route53_zone.main-primary-zone.id
  subject_alternative_names = ["*.${var.domain}"]

  wait_for_validation = false
}

##################################################################
# Bucket log for Application Load Balancer
##################################################################
module "log_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 1.0"

  bucket                         = "${local.default_name}-alb-logs"
  acl                            = "log-delivery-write"
  force_destroy                  = true
  attach_elb_log_delivery_policy = true

  lifecycle_rule = [
    {
      id      = "log"
      enabled = true
      prefix  = "log/"

      tags = {
        rule      = "log"
        autoclean = "true"
      }

      transition = [
        {
          days          = 30
          storage_class = "ONEZONE_IA"
          }, {
          days          = 60
          storage_class = "GLACIER"
        }
      ]

      expiration = {
        days = 90
      }

      noncurrent_version_expiration = {
        days = 30
      }
    },
    {
      id                                     = "log1"
      enabled                                = true
      prefix                                 = "log1/"
      abort_incomplete_multipart_upload_days = 7

      noncurrent_version_transition = [
        {
          days          = 30
          storage_class = "STANDARD_IA"
        },
        {
          days          = 60
          storage_class = "ONEZONE_IA"
        },
        {
          days          = 90
          storage_class = "GLACIER"
        },
      ]

      noncurrent_version_expiration = {
        days = 300
      }
    },
  ]

}

output "this_s3_bucket_id" {
  description = "The name of the bucket."
  value       = module.log_bucket.this_s3_bucket_id
}

output "this_s3_bucket_arn" {
  description = "The ARN of the bucket. Will be of format arn:aws:s3:::bucketname."
  value       = module.log_bucket.this_s3_bucket_arn
}

output "this_s3_bucket_website_endpoint" {
  description = "The website endpoint, if the bucket is configured with a website. If not, this will be an empty string."
  value       = module.log_bucket.this_s3_bucket_website_endpoint
}
output "this_s3_bucket_bucket_domain_name" {
  description = "The bucket domain name. Will be of format bucketname.s3.amazonaws.com."
  value       = module.log_bucket.this_s3_bucket_bucket_domain_name
}
##################################################################
#security group for Application Load Balancer
##################################################################
resource "aws_security_group" "suluq_vpc_sg-alb" {
  name_prefix = "alb-app-servers-${local.default_name}"
  description = "alb for application servers"
  vpc_id      = module.vpc.vpc_id

  ingress {
    #security_groups = ["${aws_security_group.suluq_vpc_sg-alb.id}"]
    from_port = 80
    to_port = 80
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    #security_groups = ["${aws_security_group.suluq_vpc_sg-bastion.id}"]
    from_port = 443
    to_port = 443
    protocol = "TCP"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    #security_groups = ["${aws_security_group.suluq_inchora_vpc_sg-bastion.id}"]
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
   }

  tags = {
    Name =  "${local.default_name}-http-alb-sg"

  }

}
##################################################################
# Application Load Balancer
###########t#######################################################
resource "aws_lb" "alb" {
  name               = "${local.default_name}-frontend-alb"
  internal           = false
  ip_address_type    = "ipv4"
  load_balancer_type = "application"
  security_groups    = [ aws_security_group.suluq_vpc_sg-alb.id ]

  subnets            = module.vpc.public_subnets
  
  enable_deletion_protection = false
  enable_http2               = true
  idle_timeout               = 60

  access_logs {
        bucket  = module.log_bucket.this_s3_bucket_id
        enabled = true
  }

  tags = {
        Name = "${local.default_name}-frontend-alb"
    }
}

output "aws_lb_arn" {
  description = "The ID and ARN of the ALB we created."
  value       = "${aws_lb.alb.arn}"
}
output "aws_lb_id" {
  description = "The ID and ID of the ALB we created."
  value       = "${aws_lb.alb.id}"
}
output "aws_lb_dns_name" {
  description = "The dns_name of the ALB we created."
  value       = "${aws_lb.alb.dns_name}"
}
output "aws_lb_zone_id" {
  description = "The zone_id of the ALB we created."
  value       = "${aws_lb.alb.zone_id}"
}

#-----------------------------------------------------------------------------------------------
resource "aws_lb_listener" "front_end" {
  load_balancer_arn = "${aws_lb.alb.arn}"
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
       host        = "#{host}"
       path        = "/#{path}"
       port        = "443"
       protocol    = "HTTPS"
       query       = "#{query}"
       status_code = "HTTP_301"
    }
  }
}
resource "aws_lb_listener" "front_end-2" {
  load_balancer_arn = "${aws_lb.alb.arn}"
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = module.acm.this_acm_certificate_arn


# default_action {
#    type = "authenticate-cognito"

#    authenticate_cognito {
#      user_pool_arn       = "${aws_cognito_user_pool.pool.arn}"
#      user_pool_client_id = "${aws_cognito_user_pool_client.client.id}"
#      user_pool_domain    = "${aws_cognito_user_pool_domain.domain.domain}"
#   }
# }

  default_action {
    type             = "forward"
    target_group_arn = "${aws_lb_target_group.front_end.arn}"
  }
}
output "aws_lb_listener_arn" {
  description = "The ARN of the listener we created."
  value       = "${aws_lb_listener.front_end.arn}"
}
output "aws_lb_listener_id" {
  description = "The ID of the listener we created."
  value       = "${aws_lb_listener.front_end.id}"
}
output "aws_lb_listener_arn-2" {
  description = "The ARN of the listener-2 we created."
  value       = "${aws_lb_listener.front_end-2.arn}"
}
output "aws_lb_listener_id-2" {
  description = "The ID of the listener-2 we created."
  value       = "${aws_lb_listener.front_end-2.id}"
}
#------------------------------------------------------------------------------------------------------------------
resource "aws_lb_target_group" "front_end" {
    name                 = "${local.default_name}-frontend-tg"
    deregistration_delay = 10
    port                 = 80
    protocol             = "HTTP"
    slow_start           = 0

    tags                 = {
        Name = "${local.default_name}-frontend-tg"
    }

    target_type          = "instance"
    vpc_id               = module.vpc.vpc_id

    health_check {
        enabled             = true
        healthy_threshold   = 3
        interval            = 30
        matcher             = "200-399"
        path                = "/"
        port                = "traffic-port"
        protocol            = "HTTP"
        timeout             = 6
        unhealthy_threshold = 3
    }

    stickiness {
        cookie_duration = 86400
        enabled         = false
        type            = "lb_cookie"
    }
}


output "aws_lb_target_group_id" {
  value = "${aws_lb_target_group.front_end.id}"
}
output "aws_lb_target_group_arn" {
  value = "${aws_lb_target_group.front_end.arn}"
}
#------------------------------------------------------------------------------------------------------------------

