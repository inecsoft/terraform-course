provider "aws" {
  region = var.aws_region
  profile = "ivan-arteaga-dev"
}

data "aws_caller_identity" "current" {}

#terraform state show random_pet.lambda_bucket_name
resource "random_pet" "lambda_bucket_name" {
  prefix = "tfgm-iac-code"
  length = 4
  separator = "-"
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = random_pet.lambda_bucket_name.id

  #force destroy for not prouction env
  force_destroy = true
}

output "Bucket_name" {
  value = aws_s3_bucket.lambda_bucket.id
}
output "Bucket_arn" {
  value = aws_s3_bucket.lambda_bucket.arn
}

/* aws sqs list-queues --region eu-west-1 */
resource "aws_sqs_queue" "message-queue" {
  name = "tfgm-iac-code-queue"
}

#echo aws_sqs_queue.message-queue.id | terraform console
output "SQS_URL" {
  value = aws_sqs_queue.message-queue.id
}

data "archive_file" "lambda_zip" {
  type = "zip"
  source_file = "../bin/funky"
  output_path = "../bin/funky.zip"
}


#############-Lambda-##########################
resource "aws_lambda_function" "sqs_lambda_s3" {
  function_name = "tfgm-iac-code_lambda_function"
  filename      = data.archive_file.lambda_zip.output_path
  role          = aws_iam_role.lambda_role.arn
  handler       = "funky"

  # The filebase64sha256() function is available in Terraform 0.11.12 and later
  # For Terraform 0.11.11 and earlier, use the base64sha256() function and the file() function:
  # source_code_hash = "${base64sha256(file("lambda_function_payload.zip"))}"
  source_code_hash = filebase64sha256(data.archive_file.lambda_zip.output_path)

  runtime = "go1.x"
  memory_size = 128
  timeout = 10
  environment {
    variables = {
      BUCKET_NAME = aws_s3_bucket.lambda_bucket.id
    }
  }
}
################################-Lambda-##############################

resource "aws_iam_role" "lambda_role" {
  name = "tfgm-iac-code-lambda-role"

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

resource "aws_iam_policy" "lambda_policy" {
  name        = "tfgm-iac-code-lambda-role_policy"
  path        = "/"
  description = "Iam policy for lambda to access s3"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:PutObject",
          "s3:PutObjectAcl",
        ]
        Effect   = "Allow"
        Resource = [
          "${aws_s3_bucket.lambda_bucket.arn}/*",
          "${aws_s3_bucket.lambda_bucket.arn}"
        ]
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
  #policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  policy_arn = "arn:aws:iam::aws:policy/AWSLambdaExecute"
}
resource "aws_iam_role_policy_attachment" "lambda_s3_policy_attach" {
  role = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

#echo data.aws_caller_identity.current.account_id| terraform console
resource "aws_s3_bucket_policy" "lambda_bucket_policy" {
  bucket = aws_s3_bucket.lambda_bucket.id
  policy = <<EOF

{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/${aws_iam_role.lambda_role.name}"
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": [
        "${aws_s3_bucket.lambda_bucket.arn}",
        "${aws_s3_bucket.lambda_bucket.arn}/*}"
      ]
    }
  ]
}
EOF
}

resource "aws_lambda_event_source_mapping" "lambda_event_source_mapping" {
  event_source_arn  = aws_sqs_queue.message-queue.arn
  function_name     = aws_lambda_function.sqs_lambda_s3.arn
  batch_size        = 1

}