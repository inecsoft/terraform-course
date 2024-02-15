resource "aws_kinesis_firehose_delivery_stream" "kinesis_firehose_delivery_stream_extended_s3" {
	name        = "loungebeer" # "terraform-kinesis-firehose-extended-s3-stream"
	destination = "extended_s3"

	depends_on = [aws_cloudwatch_log_group.cloudwatch_log_group]


	extended_s3_configuration {
		buffering_interval = 60
		buffering_size     = 1
		compression_format = "GZIP" #"UNCOMPRESSED"
		kms_key_arn = aws_kms_key.kms_key.arn
		role_arn   = aws_iam_role.firehose_toS3_delivery_iam_role.arn
		bucket_arn = aws_s3_bucket.s3_bucket_kinesis.arn

		cloudwatch_logging_options {
			enabled         = true
			log_group_name  =  var.cloudwatchloggroupname
			log_stream_name = "DestinationDelivery"
		}

		processing_configuration {
			enabled = false
		}

		# processing_configuration {
		#   enabled = "true"

		#   processors {
		#     type = "Lambda"

		#     parameters {
		#       parameter_name  = "LambdaArn"
		#       parameter_value = "${aws_lambda_function.lambda_processor.arn}:$LATEST"
		#     }
		#   }
		# }
	}

	server_side_encryption {
		enabled  = false
		key_type = "AWS_OWNED_CMK"
	}
}

# terraform import aws_kinesis_firehose_delivery_stream.kinesis_firehose_delivery_stream_extended_s3 arn:aws:firehose:eu-west-1:911328334795:deliverystream/loungebeer

output "aws_kinesis_firehose_delivery_stream_arn" {
  value = aws_kinesis_firehose_delivery_stream.kinesis_firehose_delivery_stream_extended_s3.arn
}