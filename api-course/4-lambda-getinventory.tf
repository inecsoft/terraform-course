#----------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function-getinventory" {
  function_name = "${local.default_name}-lambda-function-getinventory"
  description   = "lambda-function-getinventory"
  #filename       = data.archive_file.lambda.output_path
  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = aws_s3_bucket.s3-lambda-content-bucket.id
  s3_key    = "${local.app_version}/getinventory.zip"
  #s3_key    = "${var.app_version}/code.zip"

  depends_on = [aws_s3_bucket_object.s3-bucket-object-getinventory]

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler     = "index.handler"
  runtime     = "nodejs12.x"
  memory_size = 256
  timeout     = 3

  # environment {
  #   variables = {
  #     env  = "dev"
  #   }
  # }

  role = aws_iam_role.iam-role-lambda-getinventory.arn

  vpc_config {
    # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
    subnet_ids         = module.vpc.public_subnets
    security_group_ids = [aws_security_group.security-group-lambda-getinventory.id]
  }

  # depends_on = [
  #   aws_iam_role_policy_attachment.lambda_logs,
  #   aws_cloudwatch_log_group.cloudwatch-lambda,
  # ]

  tags = {
    Name = "${local.default_name}-lambda-function-getinventory"
  }
}
#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "lambda-function-getinventory-permission-from-api" {
  statement_id  = "AllowExecutionFromApiGatewaytogetinventory"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function-getinventory.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.rest-api-acme-shoes.execution_arn}/*/${aws_api_gateway_method.api-gateway-method-shoes.http_method}${aws_api_gateway_resource.api-gateway-resource-shoes.path}"
  # source_arn    = "${aws_api_gateway_rest_api.rest-api-acme-shoes.arn}/*"
  # qualifier     = aws_lambda_alias.test_alias.name
}
#----------------------------------------------------------------------------------------
#arn:aws:execute-api:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:gic0tz3ss6
