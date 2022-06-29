#terraform import aws_cloudwatch_log_subscription_filter.cw_log_lambdafunction_logfilter "<log-group-name>|<filter-name>""
/* resource "aws_cloudwatch_log_subscription_filter" "cw_log_lambdafunction_logfilter" {
  name            = "cw_log_lambdafunction_logfilter"
  provider        = aws.tfgm
  role_arn        = aws_iam_role.lambda-role-toinvoke-elastisearch.arn
  log_group_name  = "API-Gateway-Access-Logs/prod-departures"
  filter_pattern  = "?ERROR ?4"
  destination_arn = "arn:aws:lambda:eu-west-1:050124427385:function:LogsToElasticsearch_esbeenetwork_610776623993"
  #Valid values are "Random" for es only and "ByLogStream". 
  distribution    = "ByLogStream"
} */

#PutSubscriptionFilter operation cannot work with destinationArn for vendor es
#did not work even imported example