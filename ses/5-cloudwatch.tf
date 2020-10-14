#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cwm-alarm" {
    alarm_name          = "${local.default_name}-High daily Email Deliveries"
    comparison_operator = "GreaterThanOrEqualToThreshold"
    evaluation_periods  = "1"
    metric_name         = "High daily Email Delivery"
    namespace           = "AWS/SES"
    period              = "86400"
    statistic           = "Sum"
    threshold           = "100.0"
    alarm_description   = "Sum total of email delivery for a day"
    alarm_actions       = [aws_sns_topic.sns-topic-ses-notification.arn]

    tags = {
        Name = "${local.default_name}-High daily Email Deliveries"
    }
}
#-------------------------------------------------------------------------------------------------------------------------
#it helps to include your limits and notes within this description field since this will appear in
#the email that you receive and it's going to help you make quicker decisions when you have a lot of
# alerts set up. bounce rate below 10%
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cwm-alarm-ses-bounce-rate" {
    alarm_name          = "${local.default_name}-cwm-alarm-ses-bounce-rate"
    comparison_operator = "GreaterThanOrEqualToThreshold"
    evaluation_periods  = "1"
    metric_name         = "Reputation.BounceRate"
    namespace           = "AWS/SES"
    period              = "300"
    statistic           = "Average"
    threshold           = "0.02"
    alarm_description   = "Bounce rate should be under 5%."
    alarm_actions       = [aws_sns_topic.sns-topic-ses-notification.arn]

    tags = {
        Name = "${local.default_name}-ses-bounce-rate"
    }
}

#-------------------------------------------------------------------------------------------------------------------------
#This will alert us when our complaint rate has risen to halfway, to one tenth of a percent.
#And should give us enough time to take action and stop our current email campaign and see
#if we need to make adjustments to our message. complaint rate below 1/10th of a percent.
#-------------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cwm-alarm-ses-complaint-rate" {
    alarm_name          = "${local.default_name}-cwm-alarm-ses-complaint-rate"
    comparison_operator = "GreaterThanOrEqualToThreshold"
    evaluation_periods  = "1"
    metric_name         = "Reputation.ComplaintRate"
    namespace           = "AWS/SES"
    period              = "300"
    statistic           = "Average"
    threshold           = "0.0005"
    alarm_description   = "complaint rate should be under 0.1%."
    alarm_actions       = [aws_sns_topic.sns-topic-ses-notification.arn]

    tags = {
        Name = "${local.default_name}-ses-complaint-rate"
    }
}
#-------------------------------------------------------------------------------------------------------------------------

resource "aws_cloudwatch_log_group" "cw-ses-log-group" {
  name = "/aws/lambda/${local.default_name}-ses-remove-emails"

  tags = {
    Name = "${local.default_name}-ses-log-group"
  }
}
#-------------------------------------------------------------------------------------------------------------------------

resource "aws_cloudwatch_log_stream" "cw-ses-log-group-stream" {
  name           = "{local.default_name}-ses-remove-emails-stream"
  log_group_name = aws_cloudwatch_log_group.cw-ses-log-group.name
}
#-------------------------------------------------------------------------------------------------------------------------