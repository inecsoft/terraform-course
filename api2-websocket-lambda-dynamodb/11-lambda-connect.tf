#-------------------------------------------------------------------------------------------------------------------
data "archive_file" "lambda-connect" {
  type = "zip"
  #source_file = "connect/app.py"
  source_dir  = "connect"
  output_path = "connect.zip"
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function-connect" {
  function_name = "${local.default_name}-lambda-api-connect"

  s3_bucket = aws_s3_bucket.s3-lambda-content-bucket-connect.id

  s3_key  = "${local.app_version}/connect.zip"
  handler = "connect.lambda_handler"
  runtime = "python3.8"

  role = aws_iam_role.lambda-exec-connect.arn

  environment {
    variables = {
      dynamodb_table_id = aws_dynamodb_table.dynamodb-table.id
    }
  }

  depends_on = [aws_s3_bucket_object.s3-lambda-content-bucket-object-connect]

  vpc_config {
    # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
    subnet_ids         = module.vpc.public_subnets
    security_group_ids = [aws_security_group.sg-lambda.id]
  }

  tags = {
    Name = "${local.default_name}-lambda-api-connect"
  }
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "lambda-exec-connect" {
  name = "${local.default_name}-lambda-function-role-connect"

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
resource "aws_iam_policy_attachment" "iam-role-policy-lambda-connect-vpc-attach" {
  name       = "${local.default_name}-iam-role-policy-lambda-connect-vpc-attach"
  users      = []
  roles      = [aws_iam_role.lambda-exec-connect.name]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-role-policy-lambda-connect-vpc.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-role-policy-lambda-connect-vpc" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#---------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-lambda-connect-attach" {
  name       = "${local.default_name}-iam-role-policy-lambda-connect-attach"
  users      = []
  roles      = [aws_iam_role.lambda-exec-connect.name]
  groups     = []
  policy_arn = aws_iam_policy.iam-lambda-connect-logging.arn
}
#----------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-lambda-connect-logging" {
  name        = "${local.default_name}-iam-lambda-connect-logging"
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
resource "aws_lambda_permission" "apigw-connect" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function-connect.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_apigatewayv2_api.apigatewayv2-api.execution_arn}/*/*/*"
}
#----------------------------------------------------------------------------------------
resource "aws_s3_bucket" "s3-lambda-content-bucket-connect" {
  bucket = "${local.default_name}-lambda-content-bucket-connect"
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
    Name = "${local.default_name}-s3-content-bucket-connect"
  }

}
#-----------------------------------------------------------------------
output "bucket-name-connect" {
  #for_each = toset(var.lambda-name)
  value = aws_s3_bucket.s3-lambda-content-bucket-connect.id
}
#-----------------------------------------------------------------------
#echo 'formatdate("YYYYMMDDHHmmss", timestamp())'| terraform console
#formatdate("YYYYMMDDHHmmss", timestamp())
resource "aws_s3_bucket_object" "s3-lambda-content-bucket-object-connect" {
  key    = "${local.app_version}/connect.zip"
  bucket = aws_s3_bucket.s3-lambda-content-bucket-connect.id
  #content    = "web/index.html"
  #source = "web/index.html"
  source       = data.archive_file.lambda-connect.output_path
  content_type = "application/zip"

  #Encrypting with KMS Key
  #kms_key_id = aws_kms_key.key.arn

  #Server Side Encryption with S3 Default Master Key  
  #server_side_encryption = "aws:kms" 
  #metadata = var.metadata

  tags = {
    Name = "${local.default_name}-s3-content-bucket-object-connect"
  }

}
#--------------------------------------------------------------------