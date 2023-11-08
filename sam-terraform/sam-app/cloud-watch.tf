resource "aws_cloudwatch_log_group" "rest_api_cw_log" {
  name = "API-Gateway-Access-Logs/${aws_api_gateway_rest_api.rest-api-proxy.name}"
  #"API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.example.id}/${var.stage_name}"
  retention_in_days = 14

  tags = {
    Name = "rest_api_cw_log"
  }
}