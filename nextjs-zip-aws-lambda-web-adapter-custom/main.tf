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
  layers        = ["arn:aws:lambda:${var.REGION}:753240598075:layer:LambdaAdapterLayerX86:17"]
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

resource "aws_iam_policy_attachment" "iam-role-policy-lambda-vpc-attach" {
  name       = "${local.default_name}-iam-role-policy-lambda-vpc-attach"
  users      = []
  roles      = [aws_iam_role.iam_for_lambda.name]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-role-policy-lambda-vpc.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-role-policy-lambda-vpc" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
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
  target        = aws_lambda_function.nextjs.arn
  description   = "http api gateway"
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
