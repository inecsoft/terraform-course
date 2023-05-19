provider "aws" {
  region = var.aws_region
  profile ="ivan-arteaga-dev"
}

data "aws_caller_identity" "current" {}

#terraform state show random_pet.lambda_bucket_name
resource "random_pet" "lambda_bucket_name" {
  prefix = "tfgm-iac-code"
  length = 4
  separator = "-"
}

resource "aws_s3_bucket" "lambda_sbucket" {
  bucket = random_pet.lambda_bucket_name.id
}

/* aws sqs list-queues --region eu-west-1 */
resource "aws_sqs_queue" "message-queue" {
  name = "tfgm-iac-code-queue"
}

data "archive_file" "lambda_zip" {
  type = "zip"
  source_file = "../bin/funky"
  output_path = "../bin/funky.zip"
}

resource "aws_iam_role" "lambda_role" {
  name = "tfgm-iac-code-lambda-role"
  assume_role_policy = <<EOF
  {
    "Statement": [{
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      }
    }]
  }
EOF
}

resource "aws_iam_policy" "lambda_policy" {
  name        = "tfgm-iac-code-lambda-role_policy"
  path        = "/"
  description = "My test policy"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
        ]
        Effect   = "Allow"
        Resource = "${aws_s3_bucket.lambda_sbucket.arn}/*"
      },
      {
        Action = [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ]
        Effect   = "Allow"
        Resource = "${aws_sqs_queue.message-queue.arn}"
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
resource "aws_iam_role_policy_attachment" "lambda_s3_policy_attach" {
  role = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

