#--------------------------------------------------------------------------------------
# aws configservice describe-delivery-channels --profile ivan-arteaga-dev
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
# AWSServiceRoleForConfig
# aws iam create-role --role-name OrgConfigRole --assume-role-policy-document "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Sid\":\"\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"config.amazonaws.com\"},\"Action\":\"sts:AssumeRole\"}]}" --description "Role for organizational AWS Config aggregator"
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
# aws iam create-policy --policy-name OrgConfigPolicy --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":["organizations:ListAccounts","organizations:DescribeOrganization","organizations:ListAWSServiceAccessForOrganization","organizations:ListDelegatedAdministrators"],"Resource":"*"}]}'
resource "aws_iam_role_policy_attachment" "AWSConfigRole-attach" {
  role       = aws_iam_role.aws_config_role.name
  # confirmed that exist
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWS_ConfigRole"
}

# terraform import aws_config_conformance_pack.aws_config_conformance_pack_s3 s3-test-conformance-pack

# Operational Best Practice for Amazon S3
resource "aws_config_conformance_pack" "aws_config_conformance_pack_s3" {
  name = "aws-config-conformance-pack-account-password-policy"
  input_parameter {
    parameter_name  = "AccessKeysRotatedParameterMaxAccessKeyAge"
    parameter_value = "90"
  }

  template_body = <<EOT
Parameters:
  AccessKeysRotatedParameterMaxAccessKeyAge:
    Type: String
Resources:
  IAMPasswordPolicy:
    Properties:
      ConfigRuleName: IAMPasswordPolicy
      Source:
        Owner: AWS
        SourceIdentifier: IAM_PASSWORD_POLICY
    Type: AWS::Config::ConfigRule
EOT
}

#--------------------------------------------------------------------------------------
#https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_org_details.html
# Viewing the details of an organization from the management account
#  aws organizations describe-organization --profile ivan-arteaga-dev

# Viewing the details of the root container
# aws organizations list-roots --profile ivan-arteaga-dev
# ID=`aws organizations list-roots --profile ivan-arteaga-dev | jq .Roots.Id`
# aws organizations list-children --parent-id $ID --child-type ORGANIZATIONAL_UNIT

# retrieve the details about the OU
# OUID=`aws organizations list-children --parent-id $ID --child-type ORGANIZATIONAL_UNIT --profile ivan-arteaga-dev | jq .Children.Id`
# aws organizations describe-organizational-unit --organizational-unit-id $OUID --profile ivan-arteaga-dev

#Viewing details of an account
# aws organizations list-accounts --profile ivan-arteaga-dev
# aws organizations describe-account $ID --account-id --profile ivan-arteaga-dev

# To check if the enable service access is complete, enter the following command and press Enter to execute the command.
# aws organizations list-aws-service-access-for-organization --profile ivan-arteaga-dev
# https://docs.aws.amazon.com/config/latest/developerguide/set-up-aggregator-cli.html