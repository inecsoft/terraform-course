resource "aws_lambda_function" "main" {
	function_name    = var.lambda_function_name
	description      = var.lambda_description
	handler          = var.handler
	runtime          = var.runtime
	timeout          = var.timeout
	memory_size      = var.memory_size
	role             = aws_iam_role.lambda_role.arn

	filename         = "../.terraform/archive_files/${var.filename}"
	source_code_hash = data.archive_file.main.output_base64sha256

	environment {
		variables = var.environment_variables
	}

	vpc_config {
		subnet_ids         = var.subnet_ids
		security_group_ids = var.security_group_ids
	}

	layers = var.layer_arn != null ? [ aws_lambda_layer_version.main.arn ] : null
	# layers = var.layer_arn != null ? [ var.layer_arn ] : null
}

resource "aws_iam_role" "lambda_role" {
	name = "${var.lambda_function_name}-role"

	assume_role_policy = data.aws_iam_policy_document.iam_policy_document_lambda_role.json
}


data "aws_iam_policy_document" "iam_policy_document_lambda_role" {
	statement {
		sid     = ""
		effect  = "Allow"
		actions = ["sts:AssumeRole"]

		principals {
			type        = "Service"
			identifiers = ["lambda.amazonaws.com"]
		}
	}
}

data "aws_iam_policy_document" "iam_policy_document_lambda_basic_policy" {
	statement {
		sid       = ""
		effect    = "Allow"
		resources = ["arn:aws:logs:*:*:*"]

		actions = [
			"logs:CreateLogGroup",
			"logs:CreateLogStream",
			"logs:PutLogEvents",
		]
	}
}

resource "aws_iam_role_policy" "lambda_basic_policy" {
	name   = "lambda_${var.lambda_function_name}_basic_policy"
	role   = aws_iam_role.lambda_role.id
	policy = data.aws_iam_policy_document.iam_policy_document_lambda_basic_policy.json
}

resource "aws_cloudwatch_log_group" "main" {
	name              = "/aws/lambda/${var.lambda_function_name}"
	retention_in_days = var.log_retention
}

data "archive_file" "main" {
	type        = "zip"
	source_dir  = var.code_location
	output_path = "../.terraform/archive_files/${var.filename}"
	# output_path = "${path.module}/.terraform/archive_files/${var.filename}"
}
###############################################################################
resource "aws_iam_policy_attachment" "iam_policy_attachment-attach" {
	name       = "lambda-layer-function-role-attachment"
	users      = []
	roles      = [aws_iam_role.lambda_role.name]
	groups     = []
	policy_arn = data.aws_iam_policy.iam_policy-lambda-layer.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam_policy-lambda-layer" {
	arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#---------------------------------------------------------------------
resource "aws_lambda_layer_version" "main" {
	layer_name       = var.lambda_layer_name
	description      = var.layer_description
	s3_bucket        = var.s3_bucket_id
	s3_key           = var.key_s3_bucket
	source_code_hash = data.archive_file.main.output_base64sha256


	compatible_runtimes = [ var.runtime ]

	depends_on = [
		aws_s3_object.main,
	]
}

resource "aws_s3_object" "main" {
	bucket = var.s3_bucket_id
	key    = var.key_s3_bucket
	source = data.archive_file.main.output_path
	etag   = data.archive_file.main.output_base64sha256

	content_type = "application/zip"
	depends_on = [
		data.archive_file.main,
		null_resource.main,
	]
}

resource "null_resource" "main" {
	triggers = {
		updated_at = timestamp()
	}

	provisioner "local-exec" {
		command = <<EOF
		yarn config set no-progress
		yarn
		mkdir -p nodejs
		cp -r node_modules nodejs/
		rm -r node_modules
		EOF

		working_dir = "${var.code_location}"
	}
}