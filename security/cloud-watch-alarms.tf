resource "aws_cloudwatch_metric_alarm" "UnauthorizedAPICalls" {
  alarm_name          = "CIS-3.1-UnauthorizedAPICalls"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #    alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "UnauthorizedAPICalls"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "ConsoleSigninWithoutMFA" {
  alarm_name          = "CIS-3.2-ConsoleSigninWithoutMFA"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "ConsoleSigninWithoutMFA"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "RootAccountUsage" {
  alarm_name          = "CIS-3.3-RootAccountUsage"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "RootAccountUsage"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "IAMPolicyChanges" {
  alarm_name          = "CIS-3.4-IAMPolicyChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "IAMPolicyChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "CloudTrailChanges" {
  alarm_name          = "CIS-3.5-CloudTrailChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "CloudTrailChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "ConsoleAuthenticationFailure" {
  alarm_name          = "CIS-3.6-ConsoleAuthenticationFailure"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "ConsoleAuthenticationFailure"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "DisableOrDeleteCMK" {
  alarm_name          = "CIS-3.7-DisableOrDeleteCMK"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "DisableOrDeleteCMK"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "S3BucketPolicyChanges" {
  alarm_name          = "CIS-3.8-S3BucketPolicyChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "S3BucketPolicyChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"
  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "AWSConfigChanges" {
  alarm_name          = "CIS-3.9-AWSConfigChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "AWSConfigChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "SecurityGroupChanges" {
  alarm_name          = "CIS-3.10-SecurityGroupChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "SecurityGroupChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "NetworkACLChanges" {
  alarm_name          = "CIS-3.11-NetworkACLChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "NetworkACLChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "NetworkGatewayChanges" {
  alarm_name          = "CIS-3.12-NetworkGatewayChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "NetworkGatewayChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "RouteTableChanges" {
  alarm_name          = "CIS-3.13-RouteTableChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "RouteTableChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}

resource "aws_cloudwatch_metric_alarm" "VPCChanges" {
  alarm_name          = "CIS-3.14-VPCChanges"
  evaluation_periods  = 1
  comparison_operator = "GreaterThanThreshold"
  #  alarm_actions = [ module.aws_security_hub_sns.topic_arn ]
  alarm_actions       = [aws_sns_topic.sns-topic-aws-security-hub-notifications.arn]
  datapoints_to_alarm = 1
  metric_name         = "VPCChanges"
  namespace           = "LogMetrics"
  period              = 86400
  statistic           = "Maximum"
  threshold           = 0
  treat_missing_data  = "notBreaching"

  tags = {
    Environment = local.default_name
    Project     = var.project
    Name        = "${local.default_name}-metric-alarm"
  }
}