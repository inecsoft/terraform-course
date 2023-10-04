resource "aws_cloudwatch_log_group" "cloudwatch_log_group_vpn_tunnel1" {
  provider = aws.main
  name     = "cloudwatch_log_group_vpn_tunnel1"

  retention_in_days = 5

  tags = {
    Name = "cloudwatch_log_group_vpn_tunnel1"
  }
}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group_vpn_tunnel2" {
  provider = aws.main
  name     = "cloudwatch_log_group_vpn_tunnel2"

  retention_in_days = 5

  tags = {
    Name = "cloudwatch_log_group_vpn_tunnel2"
  }
}