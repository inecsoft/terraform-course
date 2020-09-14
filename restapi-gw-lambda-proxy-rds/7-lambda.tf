#----------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function" {
  function_name = "lambda-function-proxy" 

  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = aws_s3_bucket.s3-bucket.id
  s3_key    = "${var.app_version}/code.zip"

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "main.handler"
  runtime = "nodejs12.x"

  role = aws_iam_role.lambda_exec.arn

  environment {
    variables = var.credentials
  }

  vpc_config {
    subnet_ids         = [module.vpc.public_subnets]
    security_group_ids = [aws_security_group.proxy-sg.id]
  }
   
  #depends_on = [aws_efs_mount_target.alpha]
}
#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "lambda_exec" {
  name = "lambda-function-role"

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
