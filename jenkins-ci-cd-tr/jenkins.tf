#--------------------------------------------------------------------------------------------
################
# EC2 instances
################
#--------------------------------------------------------------------------------------------
resource "aws_instance" "jenkins-instance" {
  ami           = data.aws_ami.amazon_linux.id 
  instance_type = "t2.micro"

  # the VPC subnet
  subnet_id = element(module.vpc.public_subnets,0)

  # the security groupcd
  security_groups = [aws_security_group.jenkins-sg.id]

  # the public SSH key
  key_name = aws_key_pair.key.key_name

  # user data
  user_data = data.template_cloudinit_config.cloudinit-jenkins.rendered

  iam_instance_profile = aws_iam_instance_profile.JenkinsInstanceProfile.name

  root_block_device     {
      volume_size = "10"
      volume_type = "gp2"
      delete_on_termination = true
    }

  tags = {
      Name = "${local.default_name}-jenkins"
  }

  volume_tags = {
     Name      = "${local.default_name}-ebs_jenkins_volume"
  }
}
#--------------------------------------------------------------------------------------------
resource "aws_ebs_volume" "jenkins-data" {
  availability_zone = "eu-west-1a"
  size              = 20
  type              = "gp2"

  tags = {
    Name = "${local.default_name}-jenkins-data"
  }
}
#--------------------------------------------------------------------------------------------
resource "aws_volume_attachment" "jenkins-data-attachment" {
  device_name = var.INSTANCE_DEVICE_NAME
  volume_id   = aws_ebs_volume.jenkins-data.id
  instance_id = aws_instance.jenkins-instance.id
  force_detach = true
}
#--------------------------------------------------------------------------------------------
##################
# ACM certificate
##################
#--------------------------------------------------------------------------------------------
resource "aws_route53_record" "project_r53_r" {
    zone_id = data.aws_route53_zone.zone.zone_id
    name = "build.mycmrs.com"
    type = "A"

    alias {
      name = module.elb-jenkins.this_elb_dns_name
      zone_id = module.elb-jenkins.this_elb_zone_id
      evaluate_target_health = true
    }
}
#--------------------------------------------------------------------------------------------
module "acm" {
  source  = "terraform-aws-modules/acm/aws"
  version = "~> 2.0"

  zone_id = data.aws_route53_zone.zone.zone_id

  domain_name               = "build.mycmrs.com"
  subject_alternative_names = ["*.build.mycmrs.com"]

  wait_for_validation = false
}
#--------------------------------------------------------------------------------------------
#########################
# S3 bucket for ELB logs
#########################
#--------------------------------------------------------------------------------------------
resource "random_pet" "random_name" {
  length = 2
}
#--------------------------------------------------------------------------------------------
data "aws_elb_service_account" "this" {}
#--------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "jenkins-elb-logs" {
  bucket        = "${local.default_name}-jenkins-elb-logs"
  acl           = "private"
  policy        = data.aws_iam_policy_document.jenkins-elb-logs.json
  force_destroy = true
#------------------------------------------------------------------------------
#enable life cycle policy
#on the config folder
#------------------------------------------------------------------------------
  lifecycle_rule {
      prefix  = "AWSLogs/"
          enabled = true

      noncurrent_version_transition {
            days          = 30
          storage_class = "STANDARD_IA"
      }

      noncurrent_version_transition {
        days          = 60
        storage_class = "GLACIER"
      }

      noncurrent_version_expiration {
            days = 90
      }
    }
}

#------------------------------------------------------------------------------
data "aws_iam_policy_document" "jenkins-elb-logs" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.this.arn]
    }

    resources = [
      "arn:aws:s3:::jenkins-elb-logs/*",
    ]
  }
}
#------------------------------------------------------------------------------
######
# ELB
######
#--------------------------------------------------------------------------------------------
module "elb-jenkins" {
  source = "terraform-aws-modules/elb/aws"

  name = "${local.default_name}-elb-jenkins"

  subnets         = [element(module.vpc.public_subnets,0)]
  security_groups = [aws_security_group.sg-elb-jenkins.id]
  internal        = false
  cross_zone_load_balancing = false

  listener = [
    {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
    },
    {
    instance_port      = 80
    instance_protocol  = "http"
    lb_port            = 443
    lb_protocol        = "https"

      //      Note about SSL:
      //      This line is commented out because ACM certificate has to be "Active" (validated and verified by AWS, but Route53 zone used in this example is not real).
      //      To enable SSL in ELB: uncomment this line, set "wait_for_validation = true" in ACM module and make sure that instance_protocol and lb_protocol are https or ssl.
      ssl_certificate_id = module.acm.this_acm_certificate_arn
    },
  ]

  health_check = {
    target              = "HTTP:80/login"
    interval            = 30
    healthy_threshold   = 5
    unhealthy_threshold = 3
    timeout             = 10
  }

  access_logs = {
    bucket = "${aws_s3_bucket.jenkins-elb-logs.id}"
  }

  tags = {
    Name       = "${local.default_name}-elb-jenkins"
    
  }

  # ELB attachments
  number_of_instances = 1
  instances           = ["${aws_instance.jenkins-instance.id}"]
}
#--------------------------------------------------------------------------------------------
output "jenkins-ipaddress" {
  value = "${aws_instance.jenkins-instance.private_ip}"
  
}
#--------------------------------------------------------------------------------------------

