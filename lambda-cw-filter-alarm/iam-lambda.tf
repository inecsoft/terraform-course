#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-lambda-function" {
  name = "${local.default_name}-iam-role-lambda-function"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
#----------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-lambda-logging" {
  name        = "${local.default_name}-iam-policy-lambda-logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}
#----------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-policy-attach-lambda-logging" {
  role       = aws_iam_role.iam-role-lambda-function.name
  policy_arn = aws_iam_policy.iam-policy-lambda-logging.arn
}
#----------------------------------------------------------------------------------------