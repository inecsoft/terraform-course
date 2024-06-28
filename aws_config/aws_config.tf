#--------------------------------------------------------------------------------------
# aws configservice  describe-delivery-channels  --profile ivan-arteaga-dev
# aws configservice delete-delivery-channel --delivery-channel-name aws-quick-setup-delivery-channel --profile ivan-arteaga-dev
resource "aws_config_delivery_channel" "aws_config_delivery_channel" {
  name           = "${local.default_name}-aws-config-delivery-channel"
  s3_bucket_name = aws_s3_bucket.s3_bucket_aws_config.id
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
resource "aws_s3_bucket" "s3_bucket_aws_config" {
  bucket              = "${local.default_name}-aws-bucket-config"
  force_destroy       = true
  object_lock_enabled = false
}

# resource "aws_s3_bucket_acl" "s3_bucket_aws_config_acl" {
#   bucket = aws_s3_bucket.s3_bucket_aws_config.id
#   acl    = "private"
# }

resource "aws_s3_bucket_versioning" "s3_bucket_aws_config_versioning" {
  bucket = aws_s3_bucket.s3_bucket_aws_config.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_aws_config_server_side_encryption_configuration" {
  bucket = aws_s3_bucket.s3_bucket_aws_config.id

  rule {
    bucket_key_enabled = false

    apply_server_side_encryption_by_default {
      kms_master_key_id = null
      sse_algorithm     = "AES256"
    }
  }
}

resource "aws_s3_bucket_policy" "s3_bucket_aws_config_policy" {
  bucket = aws_s3_bucket.s3_bucket_aws_config.id
  policy = data.aws_iam_policy_document.aws_config_bucket_policy.json
}

resource "aws_s3_bucket_lifecycle_configuration" "s3_bucket_lifecycle_configuration" {
  bucket = aws_s3_bucket.s3_bucket_aws_config.id

  rule {
    id = "log glacier"

    status = "Enabled"

     transition {
      days          = 90
      storage_class = "GLACIER"
    }
  }

  rule {
    id = "logs deletion"

    status = "Enabled"

    expiration {
      days = 365
    }
  }
}
#--------------------------------------------------------------------------------------
data "aws_iam_policy_document" "aws_config_bucket_policy" {
  statement {
    sid       = "AWSConfigBucketPermissionsCheck"
    effect    = "Allow"
    resources = ["${aws_s3_bucket.s3_bucket_aws_config.arn}"]
    actions   = ["s3:GetBucketAcl"]

    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }

  statement {
    sid    = "AWSConfigBucketExistenceCheck"
    effect = "Allow"

    resources = ["${aws_s3_bucket.s3_bucket_aws_config.arn}"]
    actions   = ["s3:ListBucket"]
    principals {
      type        = "Service"
      identifiers = ["config.amazonaws.com"]
    }
  }

  statement {
    sid       = " AWSConfigBucketDelivery"
    effect    = "Allow"
    resources = ["${aws_s3_bucket.s3_bucket_aws_config.arn}/AWSLogs/${data.aws_caller_identity.account.account_id}/Config/*"]
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
# aws configservice  describe-configuration-recorders  --profile ivan-arteaga-dev
# aws configservice  delete-configuration-recorder --configuration-recorder-name default --profile ivan-arteaga-dev
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
  depends_on = [aws_s3_bucket.s3_bucket_aws_config]
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement":
  [
    {
    "Action": [ "s3:*" ],
    "Effect": "Allow",
    "Resource": [
        "${aws_s3_bucket.s3_bucket_aws_config.arn}",
        "${aws_s3_bucket.s3_bucket_aws_config.arn}/*"
      ]
    }
  ]
}
POLICY
}
#--------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "AWSConfigRole-attach" {
  role       = aws_iam_role.aws_config_role.name
  # confirmed that exist
  # policy_arn = "arn:aws:iam::aws:policy/service-role/AWSConfigRole"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWS_ConfigRole"


}
#--------------------------------------------------------------------------------------