#----------------------------------------------------------------------------------------
resource "aws_lambda_layer_version" "lambda_layer_version_python" {
    filename            = "packages/requirements-package.zip"
    layer_name          = "redis-library-layer-python"
    source_code_hash    = "${filebase64sha256("packages/requirements-package.zip")}"
    compatible_runtimes = ["python3.12"]
}

resource "aws_lambda_function" "lambda-function" {
  function_name = "lambda-cache"

  #filename       = data.archive_file.lambda.output_path
  # The bucket name as created earlier with "aws s3api create-bucket"
  s3_bucket = aws_s3_bucket.s3-lambda-content-bucket.id
  s3_key    = "code.zip"
  #s3_key    = "${var.app_version}/code.zip"

  memory_size = 256
  timeout = 200

  layers = [aws_lambda_layer_version.lambda_layer_version_python.arn]

  depends_on = [
    aws_s3_object.s3-lambda-content-bucket-object,
    aws_elasticache_cluster.elasticache
  ]


  # "main" is the filename within the zip file (main.js) and "handler"
  # is the name of the property under which the handler function was
  # exported in that file.
  handler = "app.handler"
  runtime = "python3.12"

  environment {
    variables = {
      # elasticache_config_endpoint = aws_elasticache_cluster.elasticache.configuration_endpoint
      elasticache_config_endpoint = "${aws_elasticache_cluster.elasticache.cache_nodes[0].address}:${aws_elasticache_cluster.elasticache.cache_nodes[0].port}"
    }
  }

  role = aws_iam_role.lambda_exec.arn

  vpc_config {
    # Every subnet should be able to reach an EFS mount target in the same Availability Zone. Cross-AZ mounts are not permitted.
    subnet_ids         = [aws_subnet.ecs_subnets_public[0].id]
    security_group_ids = [aws_security_group.allow_redis.id]
  }



  tags = {
    Name = "lambda-cache"
  }
}
#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
