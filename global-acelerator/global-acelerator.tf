#-----------------------------------------------------------------------
resource "aws_globalaccelerator_accelerator" "g-accelerator" {
  name            = local.default_name
  ip_address_type = "IPV4"
  enabled         = true

  attributes {
    flow_logs_enabled   = true
    flow_logs_s3_bucket = "${local.default_name}-bucket"
    flow_logs_s3_prefix = "flow-logs/"
  }
}

output "Dns name of global accelerator" {
  value = aws_globalaccelerator_accelerator.g-accelerator.dns_name
}
#-----------------------------------------------------------------------
resource "aws_globalaccelerator_listener" "g-accelerator-l" {
  accelerator_arn = aws_globalaccelerator_accelerator.g-accelerator.id
  client_affinity = "SOURCE_IP"
  protocol        = "TCP"

  port_range {
    from_port = 80
    to_port   = 80
  }
  port_range {
    from_port = 443
    to_port   = 443
  }
}
#-----------------------------------------------------------------------
resource "aws_globalaccelerator_endpoint_group" "g-aceleratior-g" {
  listener_arn = aws_globalaccelerator_listener.g-accelerator-l.id

  endpoint_configuration {
    endpoint_id = aws_lb.alb.arn
    weight      = 100
  }
}

#-----------------------------------------------------------------------------------------------------------
resource "aws_s3_bucket" "g-accelerator-bucket" {
  bucket        = "${local.default_name}-bucket"
  acl           = "private"
  policy        = data.aws_iam_policy_document.g-accelerator-bucket-logs.json
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
#------------------------------------------------------------------------------------------------------
data "aws_caller_identity" "current" {}
#------------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "g-accelerator-bucket-logs" {
  statement {
    actions = [
      "s3:PutObject",
    ]

    principals {
      type        = "AWS"
      identifiers = ["arn:aws:globalaccelerator::${data.aws_caller_identity.current.id}:accelerator/${local.default_name}"]
    }

    resources = [
      "arn:aws:s3:::${local.default_name}-bucket/*",
    ]
  }
}
#------------------------------------------------------------------------------------------------------

