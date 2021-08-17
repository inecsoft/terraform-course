data "archive_file" "lambda-default" {
  type = "zip"
  #source_file = "connect/app.py"
  source_dir  = "default"
  output_path = "default.zip"
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function-default" {
  function_name = "${local.default_name}-lambda-api-default"

  s3_bucket = aws_s3_bucket.s3-lambda-content-bucket-default.id

  s3_key  = "${local.app_version}/default.zip"
  handler = "default.lambda_handler"
  runtime = "python3.8"

  role = aws_iam_role.lambda-exec-default.arn

  environment {
    variables = {
      dynamodb_table_id = aws_dynamodb_table.dynamodb-table.id
    }
  }

  depends_on = [aws_s3_bucket_object.s3-lambda-content-bucket-object-default]

  vpc_config {
    # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
    subnet_ids         = module.vpc.public_subnets
    security_group_ids = [aws_security_group.sg-lambda.id]
  }

  tags = {
    Name = "${local.default_name}-lambda-api-default"
  }
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_apigatewayv2_integration" "apigatewayv2-integration-default" {
  api_id           = aws_apigatewayv2_api.apigatewayv2-api.id
  integration_type = "AWS"

  connection_type           = "INTERNET"
  content_handling_strategy = "CONVERT_TO_TEXT"
  description               = "Lambda integration with api websocket"
  integration_method        = "POST"
  integration_uri           = aws_lambda_function.lambda-function-default.invoke_arn
  passthrough_behavior      = "WHEN_NO_MATCH"
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "lambda-exec-default" {
  name = "${local.default_name}-lambda-function-role-default"

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
resource "aws_iam_policy_attachment" "iam-role-policy-lambda-default-vpc-attach" {
  name       = "${local.default_name}-iam-role-policy-lambda-default-vpc-attach"
  users      = []
  roles      = [aws_iam_role.lambda-exec-default.name]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-role-policy-lambda-default-vpc.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-role-policy-lambda-default-vpc" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#---------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-lambda-default-attach" {
  name       = "${local.default_name}-iam-role-policy-lambda-default-attach"
  users      = []
  roles      = [aws_iam_role.lambda-exec-default.name]
  groups     = []
  policy_arn = aws_iam_policy.iam-lambda-default-logging.arn
}
#----------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-lambda-default-logging" {
  name        = "${local.default_name}-iam-lambda-default-logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
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
#----------------------------------------------------------------------------------------
#By default any two AWS services have no access to one another, until access is explicitly granted.
#For Lambda functions, access is granted using the aws_lambda_permission resource
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "apigw-default" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function-default.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_apigatewayv2_api.apigatewayv2-api.execution_arn}/*/*"
}
#----------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-lambda-content-bucket-default" {
  bucket = "${local.default_name}-lambda-content-bucket-default"
  acl    = "private"

  #force destroy for not prouction env
  force_destroy = true

  versioning {
    enabled = true
  }

  object_lock_configuration {
    object_lock_enabled = "Enabled"
  }

  tags = {
    Name = "${local.default_name}-s3-content-bucket-default"
  }

}
#-----------------------------------------------------------------------
output "bucket-name-default" {
  #for_each = toset(var.lambda-name)
  value = aws_s3_bucket.s3-lambda-content-bucket-default.id
}
#-----------------------------------------------------------------------
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
#formatdate("YYYYMMDDHHmmss", timestamp())
resource "aws_s3_bucket_object" "s3-lambda-content-bucket-object-default" {
  key    = "${local.app_version}/default.zip"
  bucket = aws_s3_bucket.s3-lambda-content-bucket-default.id
  #content    = "web/index.html"
  #source = "web/index.html"
  source       = data.archive_file.lambda-default.output_path
  content_type = "application/zip"

  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-content-bucket-object-default"
  }

}
#--------------------------------------------------------------------