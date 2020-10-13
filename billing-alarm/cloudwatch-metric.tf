#-----------------------------------------------------------------------------------------------------------------------
resource "aws_cloudwatch_metric_alarm" "cloudwatch-metric-alarm" {
    depends_on = [aws_sns_topic.sns_alert_topic]
    alarm_name                = "${local.default_name}-alarm"
    actions_enabled           = true
    alarm_actions             = [ 
        aws_sns_topic.sns_alert_topic.arn
    ]
    alarm_description         = "the threshold of $10  has been reached."
    comparison_operator       = "GreaterThanOrEqualToThreshold"
    datapoints_to_alarm       = 1
    dimensions                = {
        "Currency" = "${var.currency}"
    }
    evaluation_periods        = 1
    insufficient_data_actions = []
    metric_name               = "EstimatedCharges"
    namespace                 = "AWS/Billing"
    ok_actions                = []
    period                    = 21600
    statistic                 = "Maximum"
    threshold                 = 10
    treat_missing_data        = "missing"

    tags                      = {
       Name =  "${local.default_name}-cloudwathc-alarm"
    }
}
#-------------------------------------------------------------------------------------------------------------------------
