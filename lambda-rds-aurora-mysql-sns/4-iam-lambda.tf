#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "lambda_exec" {
  name = "${local.default_name}-rds-lambda-function-role"

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
#---------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-attach-vpc" {
  name       = "${local.default_name}-cache-lambda-function-role-attachment"
  users      = []
  roles      = [aws_iam_role.lambda_exec.name]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-policy-vpc.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-policy-vpc" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#--------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-sns-topic" {
  statement {
    sid    = "lambdaToPublisOnsns"
    effect = "Allow"
    actions = [
      "sns:Publish",
    ]

    resources = [
      aws_sns_topic.sns-topic.arn
    ]
  }
}
#--------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-sns-topic" {
  name        = "${local.default_name}-iam-policy-doc-sns-topic-wbc-order-notification"
  description = "allow lambda to publish to sns"
  path        = "/"
  policy      = data.aws_iam_policy_document.iam-policy-doc-sns-topic.json
}
#---------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-policy-attach-to-sns" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.iam-policy-sns-topic.arn
}
#---------------------------------------------------------------------
