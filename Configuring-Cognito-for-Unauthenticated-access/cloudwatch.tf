resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name = var.cloudwatchloggroupname

  tags = {
    Name = "cloudwatch_log_group_kinesisfirehose"
  }
}