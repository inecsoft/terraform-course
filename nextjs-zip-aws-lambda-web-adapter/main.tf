/* module "publish_book_review" {
  source        = "terraform-aws-modules/lambda/aws"
  version       = "4.6.0"
  create_role   = false
  timeout       = 30
  source_path   = local.lambda_src_path
  function_name = "publish-book-review"
  handler       = "index.lambda_handler"
  runtime       = "python3.8"
  lambda_role   = aws_iam_role.iam_for_lambda.arn
  environment_variables = {
    DYNAMODB_TABLE_NAME = "${aws_dynamodb_table.book-reviews-ddb-table.id}"
  }
}  */


# tflint-ignore: terraform_unused_declarations

#Lambda
#The lambda.tf file is responsible for declaring the Lambda function, its policy, and CloudWatch logs.
#It utilizes the archive_file module to create a zip file of the Next.js package.

data "archive_file" "lambda" {
  type = "zip"
  # path to nextjs app root folder
  source_dir  = "${path.module}/nextjs-zip/app/.next/standalone/"
  output_path = "lambda_function_payload.zip"
}

resource "aws_lambda_function" "nextjs" {
  filename      = "lambda_function_payload.zip"
  function_name = var.LAMBDA_FUNCTION_NAME
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "run.sh"
  memory_size   = var.memory_size
  package_type  = "Zip"
  runtime       = var.NodeRuntime
  timeout       = var.timeout
  architectures = ["x86_64"]
  layers        = ["arn:aws:lambda:${var.REGION}:753240598075:layer:LambdaAdapterLayerX86:16"]
  environment {
    variables = {
      AWS_LAMBDA_EXEC_WRAPPER = var.AWS_LAMBDA_EXEC_WRAPPER
      AWS_LWA_ENABLE_COMPRESSION : true
      RUST_LOG : "info"
      PORT : var.PORT
      DYNAMODB_TABLE_NAME = "${aws_dynamodb_table.book-reviews-ddb-table.id}"
    }
  }

}


resource "aws_cloudwatch_log_group" "nextjs_log" {
  name              = "/aws/lambda/${var.LAMBDA_FUNCTION_NAME}"
  retention_in_days = 7
}

# See also the following AWS managed policy: AWSLambdaBasicExecutionRole

resource "aws_iam_role" "iam_for_lambda" {
  name = "iam_for_lambda_usage"

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

  inline_policy {
    name = "dynamodb_access"

    policy = jsonencode({
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Action" : [
            "dynamodb:List*",
            "dynamodb:DescribeReservedCapacity*",
            "dynamodb:DescribeLimits",
            "dynamodb:DescribeTimeToLive"
          ],
          "Resource" : "*",
          "Effect" : "Allow"
        },
        {
          "Action" : [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents",
          ],
          "Resource" : ["arn:aws:logs:*:*:*"],
          "Effect" : "Allow"
        },
        {
          "Action" : [
            "dynamodb:BatchGet*",
            "dynamodb:DescribeStream",
            "dynamodb:DescribeTable",
            "dynamodb:Get*",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:BatchWrite*",
            "dynamodb:CreateTable",
            "dynamodb:Delete*",
            "dynamodb:Update*",
            "dynamodb:PutItem"
          ],
          "Resource" : [
            "${aws_dynamodb_table.book-reviews-ddb-table.arn}"
          ],
          "Effect" : "Allow"
        }
      ]
    })
  }

}

resource "aws_dynamodb_table" "book-reviews-ddb-table" {
  name           = "BookReviews"
  billing_mode   = "PROVISIONED"
  read_capacity  = 1
  write_capacity = 1
  hash_key       = "ReviewId"
  range_key      = "BookTitle"

  attribute {
    name = "ReviewId"
    type = "S"
  }

  attribute {
    name = "BookTitle"
    type = "S"
  }

  attribute {
    name = "ReviewScore"
    type = "N"
  }

  global_secondary_index {
    name               = "BookTitleIndex"
    hash_key           = "BookTitle"
    range_key          = "ReviewScore"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "INCLUDE"
    non_key_attributes = ["ReviewId"]
  }

  tags = {
    Name = "book-reviews-table"
  }
}


## API Gateway

resource "aws_apigatewayv2_api" "apigatewayv2_api" {
  name          = "nextjs-zip-terraform"
  protocol_type = "HTTP"
}

#identifier and stage name
#terraform import aws_apigatewayv2_stage.apigatewayv2_api fohtwn32w5/$default
resource "aws_apigatewayv2_stage" "apigatewayv2_stage" {
  api_id = aws_apigatewayv2_api.apigatewayv2_api.id
  name        = "$default"
  auto_deploy = true
  description     = "default api stage"

  default_route_settings {
    data_trace_enabled       = false
    detailed_metrics_enabled = false
    throttling_burst_limit   = 0
    throttling_rate_limit    = 0
  }

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )

   }
}

#terraform import aws_apigatewayv2_integration.apigatewayv2_integration fohtwn32w5/sfqciqj
resource "aws_apigatewayv2_integration" "apigatewayv2_integration" {
  api_id                 = aws_apigatewayv2_api.apigatewayv2_api.id
  description            = "integration with lambda function"
  /* connection_type        = "INTERNET" */
  integration_uri        = aws_lambda_function.nextjs.invoke_arn
  integration_type       =  "AWS_PROXY" #"HTTP_PROXY"
  payload_format_version = "2.0"
  request_parameters     = {}
  request_templates      = {}
  integration_method     = "POST"
  timeout_milliseconds   = 30000
}

#terraform import aws_apigatewayv2_route.apigatewayv2_route fohtwn32w5/sfqciqj
resource "aws_apigatewayv2_route" "apigatewayv2_route" {
	depends_on = [ aws_apigatewayv2_integration.apigatewayv2_integration ]
  api_id = aws_apigatewayv2_api.apigatewayv2_api.id

  route_key = "$default" #route_key = "POST /book-review"
  target    = "integrations/${aws_apigatewayv2_integration.apigatewayv2_integration.id}"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.apigatewayv2_api.name}"

  retention_in_days = 30
}

#terraform import aws_apigatewayv2_deployment.apigatewayv2_deployment fohtwn32w5/f4ufsq
resource "aws_apigatewayv2_deployment" "apigatewayv2_deployment" {
  api_id      = aws_apigatewayv2_api.apigatewayv2_api.id
  depends_on = [ aws_apigatewayv2_route.apigatewayv2_route ]
  description = "Automatic deployment triggered by changes to the Api configuration"

  lifecycle {
    create_before_destroy = true
  }
}

#terraform import aws_lambda_permission.api_gw nextjs-zip-dev-NextjsFunction-2VbMtgFQtsaM/nextjs-zip-dev-NextjsFunctionHttpEventPermission-e21wruyX7spUte
resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.nextjs.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.apigatewayv2_api.execution_arn}/*/*"
}

resource "aws_lambda_function_url" "lambda_function_url" {
  function_name      = aws_lambda_function.nextjs.function_name
  authorization_type = "NONE"
}

output "lambda_function_url" {
	value = aws_lambda_function_url.lambda_function_url.function_url
}

output "aws_apigatewayv2_api_endpoint" {
  description = "api endpoint"
  value       = aws_apigatewayv2_api.apigatewayv2_api.api_endpoint
}
