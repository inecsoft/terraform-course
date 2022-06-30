#terraform import aws_cloudwatch_query_definition.cw_query_definition arn:aws:logs:eu-west-1:050124427385:query-definition:417c0b99-cecb-419f-ba98-669934fa1983
/* resource "aws_cloudwatch_query_definition" "cw_query_definition" {
  name = "custom_query"

  log_group_names = [
    "/aws/logGroup1",
    "/aws/logGroup2"
  ]

  query_string = <<EOF
fields @timestamp, @message
| sort @timestamp desc
| limit 25
EOF
} */

#terraform state rm aws_cloudwatch_query_definition.cw_query_definition
resource "aws_cloudwatch_query_definition" "cw_query_definition" {
    name                = "cw_query_definition"
    
    log_group_names     = [
        "API-Gateway-Execution-Logs_3ihv2zw1sh/prod",
    ]
    
    query_string        = <<EOF
    filter @message like /(?i)(status: 4)/ 
    | fields @timestamp, @message 
    | sort @timestamp desc 
    | limit 20 
    EOF
}