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

resource "aws_lambda_event_source_mapping" "lambda_event_source_mapping" {
  event_source_arn  = aws_sqs_queue.message-queue.arn
  function_name     = aws_lambda_function.sqs_lambda_s3.arn
  batch_size        = 1

}