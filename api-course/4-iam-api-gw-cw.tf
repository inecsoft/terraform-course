resource "aws_iam_role" "iam-role-api-gw-cw" {
  name = "${local.default_name}-iam-role-api-gw-cw"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = "${var.stage_name}IamRoleApGgwCw"
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
      },
    ]
  })

  tags = {
    Name = "${local.default_name}-iam-role-api-gw-cw"
  }
}

data "aws_iam_policy_document" "iam-policy-doc-role-api-gw-cw" {
  statement {
    sid = "${var.stage_name}IamPolicyDocRoleApGgwCw"
    actions = [
      "logs:PutLogEvents",
      "logs:GetLogEvents",
      "logs:FilterLogEvents",
      "logs:DescribeLogStreams",
      "logs:DescribeLogGroups",
      "logs:CreateLogStream",
      "logs:CreateLogGroup"
    ]
    resources = [
      "*",
    ]
  }

}

resource "aws_iam_policy" "iam-policy-role-api-gw-cw" {
  name = "${local.default_name}-iam-policy-role-api-gw-cw"
  path = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc-role-api-gw-cw.json
}

resource "aws_iam_role_policy_attachment" "iam-role-policy-attach" {
  role       = aws_iam_role.iam-role-api-gw-cw.name
  policy_arn = aws_iam_policy.iam-policy-role-api-gw-cw.arn
}