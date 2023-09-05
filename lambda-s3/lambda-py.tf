provider "archive" {}
#-----------------------------------------------------------------------------------------
data "archive_file" "zip" {
  type        = "zip"
  source_file = "lambda-py.py"
  output_path = "lambda-py.zip"
}
#-----------------------------------------------------------------------------------------
data "aws_iam_policy_document" "policy" {
  statement {
    sid    = ""
    effect = "Allow"

    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }

    actions = ["sts:AssumeRole"]
  }
}
#-----------------------------------------------------------------------------------------
resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda"
  assume_role_policy = data.aws_iam_policy_document.policy.json
}


data "aws_iam_policy" "iam-role-policy-lambda-vpc" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#---------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-attach" {
  name       = "iam-role-policy-attach"
  users      = []
  roles      = [aws_iam_role.iam_for_lambda.name]
  groups     = []
  policy_arn = aws_iam_policy.iam-lambda-logging.arn
}
#----------------------------------------------------------------------------------------
#DynamoDBCrudPolicy
resource "aws_iam_policy" "iam-lambda-logging" {
  name        = "iam-lambda-logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": "${aws_s3_bucket.aritifact_bucket.arn}/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
EOF
}
#-----------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda" {
  function_name = "lambda_handle"

  filename         = data.archive_file.zip.output_path
  source_code_hash = data.archive_file.zip.output_sha

  role        = aws_iam_role.iam_for_lambda.arn
  handler     = "lambda-py.lambda_handler"
  runtime     = "python3.9"
  memory_size = 128

  timeout                        = 5
  reserved_concurrent_executions = -1

  ephemeral_storage {
    size = 512
  }

  tracing_config {
    mode = "PassThrough"
  }

  /* environment {
    variables = {
      greeting = "Hello"
    }
  } */
}
#-----------------------------------------------------------------------------------------

resource "aws_lambda_permission" "with_s3" {
  statement_id   = "AllowExecutiononLambdaFroms3"
  action         = "lambda:InvokeFunction"
  function_name  = aws_lambda_function.lambda.function_name
  principal      = "s3.amazonaws.com"
  source_account = data.aws_caller_identity.current.id
  source_arn     = aws_s3_bucket.aritifact_bucket.arn
}
#-----------------------------------------------------------------------------------------

resource "aws_s3_bucket_notification" "bucket_notification" {
  bucket = aws_s3_bucket.aritifact_bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.lambda.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "input/"
    filter_suffix       = ".csv"

  }
}
#-----------------------------------------------------------------------------------------
