#----------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function-getorderstatus" {
  function_name = "${local.default_name}-lambda-function-getorderstatus"
  description   = "when rds receive and event it invokes lambada and lambda to publish messages to sns topic"
  #filename       = data.archive_file.lambda.output_path
  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = aws_s3_bucket.s3-lambda-content-bucket.id
  s3_key    = "${local.app_version}/getorderstatus.zip"
  #s3_key    = "${var.app_version}/code.zip"
   
  depends_on = [ aws_s3_bucket_object.s3-bucket-object-getorderstatus ]
  
  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler     = "getOrderStatus.handler"
  runtime     = "nodejs12.x"
  memory_size = 256
  timeout     = 3
  
  # environment {
  #   variables = {
  #     env  = "dev"
  #   }
  # }

  role = aws_iam_role.iam-role-lambda-getorderstatus.arn

  vpc_config {
    # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
    subnet_ids         = module.vpc.public_subnets
    security_group_ids = [ aws_security_group.security-group-lambda-getorderstatus.id ]
  }

  # depends_on = [
  #   aws_iam_role_policy_attachment.lambda_logs,
  #   aws_cloudwatch_log_group.cloudwatch-lambda,
  # ]

  tags = {
    Name = "${local.default_name}-lambda-function-getorderstatus"
  }
}
#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "lambda-function-getorderstatus-permission-from-api" {
  statement_id  = "AllowExecutionFromApiGatewaytogetorderstatus"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function-getorderstatus.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.rest-api-acme-shoes.execution_arn}/*"
  #arn:aws:execute-api:${var.myregion}:${var.accountId}:${aws_api_gateway_rest_api.api.id}/*/${aws_api_gateway_method.method.http_method}${aws_api_gateway_resource.resource.path}"
  # qualifier     = aws_lambda_alias.test_alias.name
}
#----------------------------------------------------------------------------------------
