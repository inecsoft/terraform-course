resource "aws_sns_topic" "sns-topic-aws-config-notifications" {
  name              = "${local.default_name}-aws-config-notifications"
  display_name      = ""
  kms_master_key_id = "alias/aws/sns"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "aws-config-notificationsSns",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:Subscribe",
        "SNS:SetTopicAttributes",
        "SNS:RemovePermission",
        "SNS:Receive",
        "SNS:Publish",
        "SNS:ListSubscriptionsByTopic",
        "SNS:GetTopicAttributes",
        "SNS:DeleteTopic",
        "SNS:AddPermission"
      ],
      "Resource": "arn:aws:sns:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:${local.default_name}-aws-config-notifications",
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
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-aws-config-notifications"
  }
}

resource "aws_sns_topic" "sns-topic-aws-security-hub-notifications" {
  name              = "${local.default_name}-aws-security-hub-notifications"
  display_name      = ""
  kms_master_key_id = "alias/aws/sns"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "aws-security-hub-notificationsSns",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "SNS:Subscribe",
        "SNS:SetTopicAttributes",
        "SNS:RemovePermission",
        "SNS:Receive",
        "SNS:Publish",
        "SNS:ListSubscriptionsByTopic",
        "SNS:GetTopicAttributes",
        "SNS:DeleteTopic",
        "SNS:AddPermission"
      ],
      "Resource": "arn:aws:sns:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:${local.default_name}-aws-security-hub-notifications",
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
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-aws-security-hub-notifications"
  }
}
