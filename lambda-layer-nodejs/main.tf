module "lambda_layer" {
	source    = "./modules/terraform-aws-lambda"
	# function_name    = var.lambda_function_name
	# handler          = var.handler
	# runtime          = var.runtime
	# timeout          = var.timeout
	memory_size      = 256

	#Subnets and Security groups if apply
	subnet_ids = [ module.vpc.public_subnet_ids[0] ]
	security_group_ids  = [ module.vpc.security_group_ids ]

	# environment_variables = {
	# 	foo = "bar"
	# }

	s3_bucket_id      = aws_s3_bucket.aritifact_bucket.id
}

module "vpc" {
	source    = "./modules/vpc"
}

# module "lambda_layer_nodejs" {
# 	source = "./modules/layer"

# 	lambda_layer_name = "LambdaNodejs20Layer"
# 	s3_bucket_id      = aws_s3_bucket.aritifact_bucket.id
# }


resource "aws_s3_bucket" "aritifact_bucket" {
	bucket        = "dev-lambda-s3-lab"
	force_destroy = true
}

resource "aws_s3_bucket_ownership_controls" "aritifact_bucket_ownership_controls" {
	bucket = aws_s3_bucket.aritifact_bucket.id
	rule {
		object_ownership = "BucketOwnerPreferred"
	}
}

resource "aws_s3_bucket_versioning" "aritifact_bucket_versioning" {
	bucket = aws_s3_bucket.aritifact_bucket.id
	versioning_configuration {
		status = "Enabled"
	}
}

resource "aws_s3_bucket_server_side_encryption_configuration" "aritifact_bucket_server_side_encryption_configuration" {
	bucket = aws_s3_bucket.aritifact_bucket.id
	depends_on = [
		aws_s3_bucket.aritifact_bucket,
	]

	rule {
		apply_server_side_encryption_by_default {
		sse_algorithm = "AES256"
		}
	}
}