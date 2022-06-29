#terraform import aws_cloudwatch_log_subscription_filter.cw_log_lambdafunction_logfilter API-Gateway-Access-Logs/prod-departures|test_lambdafunction_logfilter
resource "aws_cloudwatch_log_subscription_filter" "cw_log_lambdafunction_logfilter" {
  name            = "cw_log_lambdafunction_logfilter"
  provider        = aws.tfgm
  role_arn        = aws_iam_role.role_cross_account_lambda_to_es.arn
  log_group_name  = "API-Gateway-Access-Logs/prod-departures"
  filter_pattern  = "logtype test"
  #destination_arn = aws_kinesis_stream.test_logstream.arn
  #Valid values are "Random" for es only and "ByLogStream". 
  distribution    = "Random"
}

#arn:aws:logs:eu-west-1:050124427385:log-group:API-Gateway-Access-Logs/prod-departures:*