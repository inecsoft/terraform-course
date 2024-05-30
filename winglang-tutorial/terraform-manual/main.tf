# terraform import aws_s3_bucket.s3_bucket_Code code-c84a50b1-20240530115146199800000003

resource "aws_s3_bucket" "s3_bucket_Code" {
    bucket                      = "code-c84a50b1-20240530115146199800000003"
    force_destroy               = true
    object_lock_enabled         = false
}

# resource "aws_s3_bucket_acl" "s3_bucket_Code_acl" {
#   bucket = aws_s3_bucket.s3_bucket_Code.id
#   acl    = "private"
# }

resource "aws_s3_bucket_versioning" "s3_bucket_Code_versioning" {
  bucket = aws_s3_bucket.s3_bucket_Code.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_Code_server_side_encryption_configuration" {
    bucket = aws_s3_bucket.s3_bucket_Code.id

    rule {
        bucket_key_enabled = false

        apply_server_side_encryption_by_default {
            kms_master_key_id = null
            sse_algorithm     = "AES256"
        }
    }
}

# terraform import aws_cloudwatch_log_group.Function_CloudwatchLogGroup_Function /aws/lambda/Function-c852aba6
# aws_cloudwatch_log_group.Function_CloudwatchLogGroup_ABDCF4C4:
resource "aws_cloudwatch_log_group" "cloudwatch_log_group_Function" {
    kms_key_id        = null
    # log_group_class   = "STANDARD"
    name              = "/aws/lambda/Function-c852aba6"
    name_prefix       = null
    retention_in_days = 30
    skip_destroy      = false

}

# terraform state show aws_cloudwatch_log_group.Queue-SetConsumer0_CloudwatchLogGroup_56C2891C
# aws_cloudwatch_log_group.Queue-SetConsumer0_CloudwatchLogGroup_56C2891C:
# terraform import aws_cloudwatch_log_group.cloudwatch_log_group_Queue-SetConsumer /aws/lambda/Queue-SetConsumer0-c83c303c
resource "aws_cloudwatch_log_group" "cloudwatch_log_group_Queue-SetConsumer" {
	name              = "/aws/lambda/Queue-SetConsumer0-c83c303c"
	kms_key_id        = null
    name_prefix       = null
    retention_in_days = 30
    skip_destroy      = false

}

resource "aws_iam_role" "iam_role_Function" {
	name                  = "terraform-20240530115146190000000001"
    assume_role_policy    = jsonencode(
        {
            Statement = [
                {
                    Action    = "sts:AssumeRole"
                    Effect    = "Allow"
                    Principal = {
                        Service = "lambda.amazonaws.com"
                    }
                },
            ]
			Version   = "2012-10-17"
        }
    )

    description           = null
    force_detach_policies = false

    # managed_policy_arns   = []
    max_session_duration  = 3600

    path                  = "/"
    permissions_boundary  = null

}

resource "aws_iam_role" "iam_role_Queue-SetConsumer" {
    name                  = "terraform-20240530115146198000000002"
    assume_role_policy    = jsonencode(
        {
            Statement = [
                {
                    Action    = "sts:AssumeRole"
                    Effect    = "Allow"
                    Principal = {
                        Service = "lambda.amazonaws.com"
                    }
                },
            ]
			Version   = "2012-10-17"
        }
    )

    description           = null
    force_detach_policies = false

    # managed_policy_arns   = []
    max_session_duration  = 3600

    path                  = "/"

}

# terraform import aws_iam_role_policy.iam_role_policy_Function terraform-20240530115146190000000001:terraform-20240530115211476500000008
resource "aws_iam_role_policy" "iam_role_policy_Function" {
    name        = "terraform-20240530115211476500000008"
    policy      = jsonencode(
        {
            Statement = [
                {
                    Action   = [
                        "sqs:GetQueueUrl",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_sqs_queue.sqs_queue_Queue.arn}",
                    ]
                },
                {
                    Action   = [
                        "sqs:SendMessage",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_sqs_queue.sqs_queue_Queue.arn}",
                    ]
                },
            ]

        }
    )
    role        = aws_iam_role.iam_role_Function.name
}

# terraform state show aws_iam_role_policy.Queue-SetConsumer0_IamRolePolicy_0299B5AB
# aws_iam_role_policy.Queue-SetConsumer0_IamRolePolicy_0299B5AB:
resource "aws_iam_role_policy" "iam_role_policy_Queue-SetConsumer" {
    name        = "terraform-20240530115211475700000007"

    policy      = jsonencode(
        {
            Statement = [
                {
                    Action   = [
                        "sqs:ReceiveMessage",
                        "sqs:ChangeMessageVisibility",
                        "sqs:GetQueueUrl",
                        "sqs:DeleteMessage",
                        "sqs:GetQueueAttributes",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_sqs_queue.sqs_queue_Queue.arn}",
                    ]
                },
                {
                    Action   = [
                        "s3:PutObject*",
                        "s3:Abort*",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_s3_bucket.s3_bucket_BucketLastMessage.arn}",
                        "${aws_s3_bucket.s3_bucket_BucketLastMessage.arn}/*",
                    ]
                },
            ]

        }
    )
    role        = aws_iam_role.iam_role_Queue-SetConsumer.name
}

# terraform import aws_iam_role_policy_attachment.iam_role_policy_attachment_Function terraform-20240530115146190000000001/arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
# terraform state show aws_iam_role_policy_attachment.Function_IamRolePolicyAttachment_CACE1358
# aws_iam_role_policy_attachment.Function_IamRolePolicyAttachment_CACE1358:
resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_Function" {
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    role       = aws_iam_role.iam_role_Function.name
}

# terraform state show aws_iam_role_policy_attachment.Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D
# aws_iam_role_policy_attachment.Queue-SetConsumer0_IamRolePolicyAttachment_4A4C5C5D:
resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_Queue-SetConsumer" {
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    role       = aws_iam_role.iam_role_Queue-SetConsumer.name
}

# terraform import aws_lambda_event_source_mapping.lambda_event_source_mapping_Queue-SetConsumer_sqs-Queue 33cf886f-35aa-4cea-b137-3d959cfbe478
# terraform state show aws_lambda_event_source_mapping.Queue_EventSourceMapping_8332F7DC                             aws_lambda_event_source_mapping.Queue_EventSourceMapping_8332F7DC
# aws_lambda_event_source_mapping.Queue_EventSourceMapping_8332F7DC:
resource "aws_lambda_event_source_mapping" "lambda_event_source_mapping_Queue-SetConsumer_sqs-Queue" {
    batch_size                         = 1
    bisect_batch_on_function_error     = false
    enabled                            = true
    event_source_arn                   = aws_sqs_queue.sqs_queue_Queue.arn
    # function_arn                       = "arn:aws:lambda:eu-west-1:911328334795:function:Queue-SetConsumer0-c83c303c"
    # function_name                      = "arn:aws:lambda:eu-west-1:911328334795:function:Queue-SetConsumer0-c83c303c"
	function_name                      = aws_lambda_function.lambda_function_Queue-SetConsumer.arn

    function_response_types            = [
        "ReportBatchItemFailures",
    ]
    last_processing_result             = null
    maximum_batching_window_in_seconds = 0

    maximum_retry_attempts             = 0
	starting_position                  = null
    starting_position_timestamp        = null

    tumbling_window_in_seconds         = 0

}

# terraform state show aws_lambda_function.Function
# aws_lambda_function.Function:
resource "aws_lambda_function" "lambda_function_Function" {
    architectures                  = [
        "arm64",
    ]

    code_signing_config_arn        = null
    description                    = null
    function_name                  = "Function-c852aba6"
    handler                        = "index.handler"

    image_uri                      = null
    # invoke_arn                     = "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:911328334795:function:Function-c852aba6/invocations"
    kms_key_arn                    = null

    memory_size                    = 1024
    package_type                   = "Zip"
    publish                        = true
    # qualified_arn                  = "arn:aws:lambda:eu-west-1:911328334795:function:Function-c852aba6:2"
    # qualified_invoke_arn           = "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:911328334795:function:Function-c852aba6:2/invocations"
    reserved_concurrent_executions = -1
    role                           = aws_iam_role.iam_role_Function.arn
    runtime                        = "nodejs20.x"
    s3_bucket                      = aws_s3_bucket.s3_bucket_Code.id
    s3_key                         = "Function.zip"
    signing_job_arn                = null
    signing_profile_version_arn    = null
    skip_destroy                   = false

    timeout                        = 60

    environment {
        variables = {
            "NODE_OPTIONS"       = "--enable-source-maps"
            "QUEUE_URL_1cfcc997" = "${aws_sqs_queue.sqs_queue_Queue.url}"
            "WING_FUNCTION_NAME" = "Function-c852aba6"
            "WING_TARGET"        = "tf-aws"
        }
    }

    ephemeral_storage {
        size = 512
    }

    tracing_config {
        mode = "PassThrough"
    }
}

# terraform state  show aws_lambda_function.Queue-SetConsumer0
# aws_lambda_function.Queue-SetConsumer0:
resource "aws_lambda_function" "lambda_function_Queue-SetConsumer" {
	function_name                  = "Queue-SetConsumer0-c83c303c"
    architectures                  = [
        "arm64",
    ]

    code_signing_config_arn        = null
    description                    = null

    handler                        = "index.handler"

    image_uri                      = null
    # invoke_arn                     = "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:911328334795:function:Queue-SetConsumer0-c83c303c/invocations"
    kms_key_arn                    = null

    memory_size                    = 1024
    package_type                   = "Zip"
    publish                        = true
    # qualified_arn                  = "arn:aws:lambda:eu-west-1:911328334795:function:Queue-SetConsumer0-c83c303c:1"
    # qualified_invoke_arn           = "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:911328334795:function:Queue-SetConsumer0-c83c303c:1/invocations"
    reserved_concurrent_executions = -1
    role                           = aws_iam_role.iam_role_Queue-SetConsumer.arn
    runtime                        = "nodejs20.x"
    s3_bucket                      = aws_s3_bucket.s3_bucket_Code.id
    s3_key                         = "Queue-SetConsumer.zip"
    signing_job_arn                = null
    signing_profile_version_arn    = null
    skip_destroy                   = false

    timeout                        = 30

    environment {
        variables = {
            "BUCKET_NAME_088f7161" = "${aws_s3_bucket.s3_bucket_BucketLastMessage.id}"
            "NODE_OPTIONS"         = "--enable-source-maps"
            "WING_FUNCTION_NAME"   = "Queue-SetConsumer0-c83c303c"
            "WING_TARGET"          = "tf-aws"
        }
    }

    ephemeral_storage {
        size = 512
    }

    tracing_config {
        mode = "PassThrough"
    }
}

# terraform state show aws_s3_bucket.BucketLastMessage
# aws_s3_bucket.BucketLastMessage:
resource "aws_s3_bucket" "s3_bucket_BucketLastMessage" {
	bucket                      = "bucket-last-message-c891435b-20240530115146203200000004"
    acceleration_status         = null

    force_destroy               = false

    object_lock_enabled         = false

}

# resource "aws_s3_bucket_acl" "s3_bucket_Code_acl" {
#   bucket = aws_s3_bucket.s3_bucket_Code.id
#   acl    = "private"
# }

resource "aws_s3_bucket_versioning" "s3_bucket_BucketLastMessage" {
  bucket = aws_s3_bucket.s3_bucket_BucketLastMessage.id
  versioning_configuration {
    status = "Disabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_BucketLastMessage_server_side_encryption_configuration" {
    bucket = aws_s3_bucket.s3_bucket_BucketLastMessage.id

    rule {
        bucket_key_enabled = false

        apply_server_side_encryption_by_default {
            kms_master_key_id = null
            sse_algorithm     = "AES256"
        }
    }
}

# erraform state show aws_sqs_queue.Queue
# aws_sqs_queue.Queue:
# terraform import aws_sqs_queue.sqs_queue_Queue https://sqs.eu-west-1.amazonaws.com/911328334795/Queue-c822c726
resource "aws_sqs_queue" "sqs_queue_Queue" {
    # arn                               = "arn:aws:sqs:eu-west-1:911328334795:Queue-c822c726"
	name                              = "Queue-c822c726"
	content_based_deduplication       = false
    deduplication_scope               = null
    delay_seconds                     = 0
    fifo_queue                        = false
    fifo_throughput_limit             = null

    kms_data_key_reuse_period_seconds = 300
    kms_master_key_id                 = null
    max_message_size                  = 262144
    message_retention_seconds         = 3600

    name_prefix                       = null
    policy                            = null
    receive_wait_time_seconds         = 0
    redrive_allow_policy              = null
    redrive_policy                    = null
    sqs_managed_sse_enabled           = true

    # url                               = "https://sqs.eu-west-1.amazonaws.com/911328334795/Queue-c822c726"
    visibility_timeout_seconds        = 30
}

# terraform state show aws_s3_object.Function_S3Object_C62A0C2D
# aws_s3_object.Function_S3Object_C62A0C2D:
#  terraform import aws_s3_object.s3_object_Function code-c84a50b1-20240530115146199800000003/asset.c852aba6d7cbe50c86bbedd1463b05db52425574b5.41dfa1454dbde5f2888f3f2ad4dc47c6.zip
resource "aws_s3_object" "s3_object_Function" {
    bucket                        = aws_s3_bucket.s3_bucket_Code.id
    bucket_key_enabled            = false
    cache_control                 = null
    checksum_crc32                = null
    checksum_crc32c               = null
    checksum_sha1                 = null
    checksum_sha256               = null
    content_disposition           = null
    content_encoding              = null
    content_language              = null
    content_type                  = "application/octet-stream"
    etag                          = filemd5(data.archive_file.lambda_Function.output_path)
    force_destroy                 = false

    key                           = "Function.zip" #"asset.c852aba6d7cbe50c86bbedd1463b05db52425574b5.41dfa1454dbde5f2888f3f2ad4dc47c6.zip"
    object_lock_legal_hold_status = null
    object_lock_mode              = null
    object_lock_retain_until_date = null
    server_side_encryption        = "AES256"
	source                        = data.archive_file.lambda_Function.output_path
    # source                        = "assets/Function_Asset_212D1EED/E9F87AA6E419D5433B20FBD41DB69427/archive.zip"
    storage_class                 = "STANDARD"

    version_id                    = null
    website_redirect              = null
}

data "archive_file" "lambda_Function" {
  type = "zip"
  #source_file = "connect/app.py"
  source_dir  = "assets/Function"
  output_path = "Function.zip"
}

# terraform state show aws_s3_object.Queue-SetConsumer0_S3Object_2AD0A795
# aws_s3_object.Queue-SetConsumer0_S3Object_2AD0A795:
resource "aws_s3_object" "s3_object_Queue-SetConsumer" {
    bucket                        = aws_s3_bucket.s3_bucket_Code.id
    bucket_key_enabled            = false
    cache_control                 = null
    checksum_crc32                = null
    checksum_crc32c               = null
    checksum_sha1                 = null
    checksum_sha256               = null
    content_disposition           = null
    content_encoding              = null
    content_language              = null
    content_type                  = "application/octet-stream"
    etag                          = filemd5(data.archive_file.lambda_Queue-SetConsumer.output_path)
    force_destroy                 = false

    key                           = "Queue-SetConsumer.zip" #"asset.c83c303c1266dbb851c70f1219bd171134fd688af4.36140a7f3c37eef6be772a49a48da1a3.zip"
	source                        = data.archive_file.lambda_Queue-SetConsumer.output_path
    # content_type = "application/zip"
    object_lock_legal_hold_status = null
    object_lock_mode              = null
    object_lock_retain_until_date = null
    server_side_encryption        = "AES256"
    # source                        = "assets/Queue-SetConsumer0_Asset_370CBC69/F3238E06B8F0F62B185E3F359ADF98C8/archive.zip"
    storage_class                 = "STANDARD"

    version_id                    = null
    website_redirect              = null
}

data "archive_file" "lambda_Queue-SetConsumer" {
  type = "zip"
  #source_file = "connect/app.py"
  source_dir  = "assets/Queue-SetConsumer"
  output_path = "Queue-SetConsumer.zip"
}

