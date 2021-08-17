#----------------------------------------------------------------------------------------

data "archive_file" "lambda" {
  for_each = toset(var.lambda-name)
  type     = "zip"
  #source_file = "connect/app.py"
  source_dir  = each.key
  output_path = "${each.key}.zip"
}
#-------------------------------------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function" {
  for_each      = toset(var.lambda-name)
  function_name = "${local.default_name}-lambda-api-${each.key}"

  s3_bucket = aws_s3_bucket.s3-lambda-content-bucket[each.key].id

  s3_key  = "${local.app_version}/${each.key}.zip"
  handler = "${each.key}.${each.key}"
  runtime = "python3.8"

  role = aws_iam_role.lambda-exec.arn

  environment {
    variables = {
      dynamodb_table_id = aws_dynamodb_table.dynamodb-table.id
    }
  }

  depends_on = [
    aws_s3_bucket_object.s3-lambda-content-bucket-object
  ]

  vpc_config {
    # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
    subnet_ids         = module.vpc.public_subnets
    security_group_ids = [aws_security_group.sg-lambda.id]
  }

  tags = {
    Name = "${local.default_name}-function"
  }
}

#-------------------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "lambda-exec" {
  name = "${local.default_name}-lambda-function-role"

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
resource "aws_iam_policy_attachment" "iam-role-policy-lambda-vpc-attach" {
  name       = "${local.default_name}-iam-role-policy-lambda-vpc-attach"
  users      = []
  roles      = [aws_iam_role.lambda-exec.name]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-role-policy-lambda-vpc.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-role-policy-lambda-vpc" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#---------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-attach" {
  name       = "${local.default_name}-iam-role-policy-attach"
  users      = []
  roles      = [aws_iam_role.lambda-exec.name]
  groups     = []
  policy_arn = aws_iam_policy.iam-lambda-logging.arn
}
#----------------------------------------------------------------------------------------
#DynamoDBCrudPolicy
resource "aws_iam_policy" "iam-lambda-logging" {
  name        = "${local.default_name}-iam-lambda-logging"
  path        = "/"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:DeleteItem",
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:Scan",
        "dynamodb:UpdateItem",
        "dynamodb:*",
        "dax:*"
      ],
      "Resource": "*"
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
#----------------------------------------------------------------------------------------
#By default any two AWS services have no access to one another, until access is explicitly granted.
#For Lambda functions, access is granted using the aws_lambda_permission resource
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "apigw" {
  for_each      = toset(var.lambda-name)
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function[each.key].function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_apigatewayv2_api.apigatewayv2-api.execution_arn}/*/*"
}
#----------------------------------------------------------------------------------------
