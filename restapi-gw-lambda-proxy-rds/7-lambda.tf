#----------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function" {
  function_name = "${local.default_name}-lambda-function-proxy"

  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = aws_s3_bucket.s3-bucket.id
  s3_key    = "${local.app_version}/code.zip"

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "main.handler"
  runtime = "nodejs12.x"

  role = aws_iam_role.lambda_exec.arn

  # environment {
  #   variables = var.credentials
  # }

  environment {
    variables = map("username", var.credentials.username,
      "password", random_password.password.result,
      "engine", var.credentials.engine,
      "host", module.db.this_db_instance_endpoint,
      "port", var.credentials.port,
      "dbname", var.credentials.dbname,
      "dbInstanceIdentifier", var.credentials.dbInstanceIdentifier,
      "region", var.AWS_REGION
    )
  }

  depends_on = [aws_s3_bucket_object.s3-lambda-content-bucket-object]

  vpc_config {
    subnet_ids         = module.vpc.public_subnets
    security_group_ids = [aws_security_group.lambda-sg.id]
  }

  tags = {
    Name = "${local.default_name}-function"
  }

  #depends_on = [aws_efs_mount_target.alpha]
}
#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "lambda_exec" {
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
resource "aws_iam_policy_attachment" "lambda-role-policy-attach" {
  name       = "${local.default_name}-role-policy-attachment"
  users      = []
  roles      = [aws_iam_role.lambda_exec.name]
  groups     = []
  policy_arn = aws_iam_policy.lambda-role-policy.arn
}
#----------------------------------------------------------------------------------------
resource "aws_iam_policy" "lambda-role-policy" {
  name        = "${local.default_name}-role-policy"
  path        = "/"
  description = "This policy solves: The provided execution role does not have permissions to call CreateNetworkInterface on EC2"

  policy = <<-EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:AttachNetworkInterface",
        "ec2:CreateNetworkInterface",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeInstances",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DetachNetworkInterface",
        "ec2:ModifyNetworkInterfaceAttribute",
        "ec2:ResetNetworkInterfaceAttribute"
      ],
      "Resource": "*"
    },
    {
        "Effect": "Allow",
        "Action": [
            "logs:*"
        ],
        "Resource": "arn:aws:logs:*:*:*"
    },
    {
      "Effect": "Allow",
      "Action": [
          "lambda:GetFunctionConfiguration",
          "lambda:UpdateFunctionConfiguration",
          "lambda:InvokeFunction"
      ],
      "Resource": [
          "*"
      ]
    }
  ]
}
EOF
}
#----------------------------------------------------------------------------------------
# resource "aws_lambda_alias" "lambda-alias" {
#   name             = "${local.default_name}-lambda-function-proxy-alias"
#   description      = "alias for lambda function"
#   function_name    = aws_lambda_function.lambda-function.function_name
#   function_version = "$LATEST"
# }
#----------------------------------------------------------------------------------------
#arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole
# #----------------------------------------------------------------------------------------
# resource "aws_lambda_permission" "lambda_permission" {
#   statement_id  = "AllowAPIGatewayInvoke"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.lambda-function.function_name
#   principal     = "apigateway.amazonaws.com"

#   # The /*/*/* part allows invocation from any stage, method and resource path
#   # within API Gateway REST API.
#   source_arn = "${aws_api_gateway_rest_api.rest-ap.execution_arn}/*/*/*"
# }
# #----------------------------------------------------------------------------------------
