#-------------------------------------------------------------------------------------
##aws events describe-rule --name "DailyLambdaFunction" 
resource "aws_cloudwatch_event_rule" "cwe-rule-gitlab-backup" {
  name                = "${local.default_name}-cwe-rule-gitlab-backup"
  description         = "backup of instances ${local.default_name}-cwe-rule-gitlab-backup nightly"
  #schedule_expression = "cron(0 0 * * ? *)"
  schedule_expression = "rate(1 day)"
  #schedule_expression = "rate(5 minutes)"

  tags   = {
    Name = "${local.default_name}-gitlab-backup"
  }
}
#-------------------------------------------------------------------------------------
#terraform import aws_cloudwatch_event_target.cwe-target-gitlab-backup rule-name/target-id
#aws events list-targets-by-rule --rule  "DailyLambdaFunction"
#-------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_target" "cwe-target-gitlab-backup" {
  target_id = "${local.default_name}-cwe-rule-gitlab-backup"
  rule      = aws_cloudwatch_event_rule.cwe-rule-gitlab-backup.name
  #ec2 createsnapshot api call
  arn       = "arn:aws:events:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:target/create-snapshot"

  role_arn  = aws_iam_role.cwe-role.arn
  
  #Volume ID
  #input     = "{\"Constant:\":[\"${aws_ebs_volume.ebs-volume-1.id}\"]}"
  input     = "\"${aws_ebs_volume.ebs-volume-1.id}\""

}
#-------------------------------------------------------------------------------------
