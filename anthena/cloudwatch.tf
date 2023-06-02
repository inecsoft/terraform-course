resource "aws_cloudwatch_log_group" "cloudwatch_log_group_cloudtrail" {
  name = "aws-cloudtrail-logs"

}

output "cloudwatch-stream_arn" {
  value = aws_cloudwatch_log_group.cloudwatch_log_group_cloudtrail.arn
}