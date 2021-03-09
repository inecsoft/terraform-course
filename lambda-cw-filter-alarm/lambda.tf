#----------------------------------------------------------------------------------------
resource "aws_lambda_function" "lambda-function" {
  function_name = var.FUNCTION_NAME 
  
  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = aws_s3_bucket.inecsoft-serverless.id
  s3_key    = "${var.app_version}/code.zip"

  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "main.handler"
  runtime = "nodejs10.x"

  role = aws_iam_role.iam-role-lambda-function.arn

  tags  =   {
    Name   = "${local.default_name}-lambda-function"
  }
}

#----------------------------------------------------------------------------------------
#All incoming requests to API Gateway must match with a configured resource and
#method in order to be handled.

#The special path_part value "{proxy+}" activates proxy behavior,
#which means that this resource will match any request path.
#this means that all incoming requests will match this resource.
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  parent_id   = aws_api_gateway_rest_api.rest-api.root_resource_id
  path_part   = "{proxy+}"
}
#----------------------------------------------------------------------------------------
#Each method on an API gateway resource has an integration which specifies where incoming requests are routed
#that requests to this method should be sent to the Lambda function
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.rest-api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}
#----------------------------------------------------------------------------------------
#The AWS_PROXY integration type causes API gateway to call into the API of another AWS service.
#In this case, it will call the AWS Lambda API to create an "invocation" of the Lambda function.
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda-function.invoke_arn
}
#----------------------------------------------------------------------------------------
#Unfortunately the proxy resource cannot match an empty path at the root of the API.
#To handle that, a similar configuration must be applied to the root resource 
#that is built in to the REST API object:
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.rest-api.id
  resource_id   = aws_api_gateway_rest_api.rest-api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda-function.invoke_arn
}
#----------------------------------------------------------------------------------------
#you need to create an API Gateway "deployment" in order to activate the configuration
#and expose the API at a URL that can be used for testing:
#----------------------------------------------------------------------------------------
resource "aws_api_gateway_deployment" "api-deployment" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root
  ]

  rest_api_id = aws_api_gateway_rest_api.rest-api.id
  stage_name  = "test"
}
#----------------------------------------------------------------------------------------
#By default any two AWS services have no access to one another, until access is explicitly granted.
#For Lambda functions, access is granted using the aws_lambda_permission resource
#----------------------------------------------------------------------------------------
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda-function.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.rest-api.execution_arn}/*/*"
}
#----------------------------------------------------------------------------------------

#----------------------------------------------------------------------------------------

