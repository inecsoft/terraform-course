resource "aws_cloudwatch_event_rule" "cloudwatch_event_rule_console" {
  name        = "capture-aws-sign-in"
  description = "Capture each AWS Console Sign In"

  event_pattern = jsonencode({
    detail-type = [
      "AWS Console Sign In via CloudTrail"
    ]
  })
}


resource "aws_cloudwatch_event_rule" "cloudwatch_event_rule_ecs" {
	name        = "event-rule-ecs"
	description = "managing scaling up down ecs cluster"
  force_destroy       = true

	event_pattern = jsonencode({
		"source": ["aws.ec2", "aws.autoscaling"],
		"detail-type": ["EC2 Spot Instance Interruption Warning", "EC2 Instance-terminate Lifecycle Action", "EC2 Instance Launch Successful"],
		"detail": {
			"LifecycleHookName": ["ecs-managed-draining-termination-hook", {
			"exists": false
			}]
		}
	})
}


resource "aws_cloudwatch_event_target" "cloudwatch_event_target_sns" {
  rule      = aws_cloudwatch_event_rule.cloudwatch_event_rule_console.name
  target_id = "SendToSNS"
  arn       = aws_sns_topic.sns_topic_aws_logins.arn
}

resource "aws_sns_topic" "sns_topic_aws_logins" {
  name = "aws-console-logins-sns"
}

resource "aws_sns_topic_policy" "sns_topic_policy" {
  arn    = aws_sns_topic.sns_topic_aws_logins.arn
  policy = data.aws_iam_policy_document.sns_topic_policy.json
}

data "aws_iam_policy_document" "sns_topic_policy" {
  statement {
    effect  = "Allow"
    actions = ["SNS:Publish"]

    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }

    resources = [aws_sns_topic.sns_topic_aws_logins.arn]
  }
}

# Subscribe to sns topic with endpoint of our phone number
#--------------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "aws-config-sns-topic-subcription" {
  topic_arn = aws_sns_topic.sns_topic_aws_logins.arn
  protocol  = "sms"
  endpoint  = var.phone_number
}