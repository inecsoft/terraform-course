# tflint-ignore: terraform_unused_declarations

#Lambda
#The lambda.tf file is responsible for declaring the Lambda function, its policy, and CloudWatch logs.
#It utilizes the archive_file module to create a zip file of the Next.js package.

data "archive_file" "lambda" {
  type = "zip"
  # path to nextjs app root folder
  source_dir  = "${path.module}/issue-tracker/.next/standalone/"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "nextjs" {
  filename      = "lambda_function_payload.zip"
  function_name = var.LAMBDA_FUNCTION_NAME
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"
  memory_size   = var.memory_size
  package_type  = "Zip"
  runtime       = var.NodeRuntime
  timeout       = var.timeout
  architectures = ["x86_64"]
  layers        = ["arn:aws:lambda:${var.REGION}:753240598075:layer:LambdaAdapterLayerX86:16"]
  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = var.AWS_LAMBDA_EXEC_WRAPPER
      AWS_LWA_ENABLE_COMPRESSION : true
      RUST_LOG : "info"
      PORT : var.PORT
    }
  }

}

data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_for_lambda" {
  name               = "iam_for_lambda_nextjs"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_cloudwatch_log_group" "nextjs_log" {
  name              = "/aws/lambda/${var.LAMBDA_FUNCTION_NAME}"
  retention_in_days = 7
}

# See also the following AWS managed policy: AWSLambdaBasicExecutionRole
data "aws_iam_policy_document" "lambda_nextjs_logging" {
  statement {
    effect = "Allow"

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]

    resources = ["arn:aws:logs:*:*:*"]
  }
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "lambda_nextjs_logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"
  policy      = data.aws_iam_policy_document.lambda_nextjs_logging.json
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}