resource "aws_sns_topic" "sns-topic" {
  count       =  var.enable_alarms > 0 ? 1 : 0  
  name        = "${local.default_name}-${var.api_name}-400-500-errors-upper-sns"

  tags = {
    Environment = local.default_name
    Api_name    = "${local.default_name}-${var.api_name}"
    Type        = "cloudwatch-metric-alarm-sns-notification"
  }
}

resource "aws_sns_topic_policy" "sns-topic-policy" {
  count       = var.enable_alarms > 0 ? 1 : 0  
  arn         = aws_sns_topic.sns-topic[count.index].arn

  policy = data.aws_iam_policy_document.sns-topic-policy[count.index].json
}


data "aws_iam_policy_document" "sns-topic-policy" {
  count       =  var.enable_alarms > 0 ? 1 : 0  
  policy_id = "${local.default_name}_${var.api_name}"

  statement {
    actions = [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish",
        "SNS:Receive"
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceOwner"

      values = [
        data.aws_caller_identity.current.account_id
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      aws_sns_topic.sns-topic[count.index].arn,
    ]

    sid = "${local.default_name}_${var.api_name}"
  }
}