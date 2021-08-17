#--------------------------------------------------------------------------------------
resource "aws_config_delivery_channel" "aws_config_delivery_channel" {
  name           = "${local.default_name}-aws-config-delivery-channel"
  s3_bucket_name = module.aws_config_s3_bucket.this_s3_bucket_id
  sns_topic_arn  = aws_sns_topic.aws-config-sns-topic.arn
  depends_on     = [aws_config_configuration_recorder.aws_config_configuration_recorder]
}
#--------------------------------------------------------------------------------------

#--------------------------------------------------------------------------------------
# Create an sns topic
#--------------------------------------------------------------------------------------
resource "aws_sns_topic" "aws-config-sns-topic" {
  name = "${local.default_name}-aws-config-sns-topic"
}

resource "aws_sns_topic_policy" "aws-config-sns-topic-policy" {
  arn    = aws_sns_topic.aws-config-sns-topic.arn
  policy = <<EOF
{
    "Id": "TSTopicPolicy",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AWSConfigSNSPolicy",
            "Action": "SNS:Publish",
            "Effect": "Allow",
            "Principal": {
                "Service": "config.amazonaws.com"
            },
            "Resource": "*"
        }
    ]
}
EOF

}
#--------------------------------------------------------------------------------------
# Subscribe to sns topic with endpoint of our phone number
#--------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "aws-config-sns-topic-subcription" {
  topic_arn = aws_sns_topic.aws-config-sns-topic.arn
  protocol  = "sms"
  endpoint  = var.phone_number
}
#--------------------------------------------------------------------------------------
module "aws_config_s3_bucket" {
  source        = "terraform-aws-modules/s3-bucket/aws"
  bucket        = "${local.default_name}-aws-config-bucket"
  policy        = data.aws_iam_policy_document.aws_config_bucket_policy.json
  attach_policy = true

  tags = {
    Name = "${local.default_name}-aws-config"
  }
}
#--------------------------------------------------------------------------------------
data "aws_iam_policy_document" "aws_config_bucket_policy" {
  statement {
    sid       = "AWSConfigBucketPermissionsCheck"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-aws-config-bucket"]
    actions   = ["s3:GetBucketAcl"]

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }

  statement {
    sid    = "AWSConfigBucketExistenceCheck"
    effect = "Allow"

    resources = ["arn:aws:s3:::${local.default_name}-aws-config-bucket"]
    actions   = ["s3:ListBucket"]
    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }

  statement {
    sid       = " AWSConfigBucketDelivery"
    effect    = "Allow"
    resources = ["arn:aws:s3:::${local.default_name}-aws-config-bucket/AWSLogs/${data.aws_caller_identity.account.account_id}/Config/*"]
    actions   = ["s3:PutObject"]

    condition {
      test     = "StringEquals"
      variable = "s3:x-amz-acl"
      values   = ["bucket-owner-full-control"]
    }

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }
}
#--------------------------------------------------------------------------------------
resource "aws_config_configuration_recorder" "aws_config_configuration_recorder" {
  name     = "${local.default_name}-aws-config-configuration-recorder"
  role_arn = aws_iam_role.aws_config_role.arn

  recording_group {
    all_supported                 = true
    include_global_resource_types = true
  }
}
#--------------------------------------------------------------------------------------
resource "aws_config_configuration_recorder_status" "aws_config_configuration_recorder_status" {
  name       = aws_config_configuration_recorder.aws_config_configuration_recorder.name
  is_enabled = true
  depends_on = [aws_config_delivery_channel.aws_config_delivery_channel]
}
#--------------------------------------------------------------------------------------
resource "aws_iam_role" "aws_config_role" {
  path               = "/service-role/"
  name               = "${local.default_name}-aws-config-role"
  assume_role_policy = <<POLICY
{
    "Version": "2012-10-17", 
    "Statement": [ 
    { 
        "Action": "sts:AssumeRole",
        "Principal": {
            "Service": "config.amazonaws.com" 
        },
        "Effect": "Allow",
        "Sid": ""
    }
  ]
}
POLICY
}
#--------------------------------------------------------------------------------------            
resource "aws_iam_role_policy" "aws_config_policy" {
  name   = "${local.default_name}-aws-config-role-policy"
  role   = aws_iam_role.aws_config_role.id
  policy = <<POLICY
{ 
    "Version": "2012-10-17", 
    "Statement": 
    [ 
        { 
        "Action": [ "s3:*" ],
        "Effect": "Allow",
        "Resource": [ 
            "${module.aws_config_s3_bucket.this_s3_bucket_arn}",
            "${module.aws_config_s3_bucket.this_s3_bucket_arn}/*"
            ] 
        }
    ]
}
POLICY
}
#--------------------------------------------------------------------------------------             
resource "aws_iam_role_policy_attachment" "AWSConfigRole-attach" {
  role       = aws_iam_role.aws_config_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSConfigRole"
}
#--------------------------------------------------------------------------------------