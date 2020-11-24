#----------------------------------------------------------------------------------------
resource "aws_api_gateway_account" "api-gateway-account" {
  cloudwatch_role_arn = aws_iam_role.api-gateway-cloudwatch-iam-role.arn
}
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "api-gateway-cloudwatch-iam-role" {
  name = "${local.default_name}-api-gateway-cloudwatch-iam-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#----------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "api-gateway-cloudwatch-iam-role-policy" {
  name = "${local.default_name}-api-gateway-cloudwatch-iam-role-policy"
  role = aws_iam_role.api-gateway-cloudwatch-iam-role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams",
          "logs:PutLogEvents",
          "logs:GetLogEvents",
          "logs:FilterLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}
#----------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-log-group-api" {
  name              = "API-Gateway-Execution-Logs_${aws_api_gateway_rest_api.api-gateway-rest-api.id}/${var.stage_name}"
  retention_in_days = 7
  # ... potentially other configuration ...
}
#----------------------------------------------------------------------------------------
