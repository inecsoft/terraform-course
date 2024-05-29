# % terraform import aws_cloudwatch_log_group.test_group yada DOMAIN_NAME
resource "aws_cloudwatch_log_group" "cloudwatch_log_group_Uploadfiles" {
	# log_group_class   = "STANDARD"
	name              = "/aws/lambda/Upload-files-c852a97c"
	name_prefix       = null
	retention_in_days = 30
	skip_destroy      = false

}

resource "aws_cloudwatch_log_group" "cloudwatch_log_group_origin_oncreate-OnMessage" {
	name              =  "/aws/lambda/oncreate-OnMessage0-c8f91248"
	name_prefix       = null
	retention_in_days = 30
	skip_destroy      = false
}

# % terraform import aws_iam_role.developer developer_name
resource "aws_iam_role" "iam_role_Uploadfiles" {
	name                  = "terraform-20240521144017349800000005"
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

    # managed_policy_arns   = ["arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",]
    max_session_duration  = 3600
    path                  = "/"
    permissions_boundary  = null

}

resource "aws_iam_role" "iam_role_origin_oncreate_OnMessage" {
	name                  = "terraform-20240521144017349300000004"
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

    # managed_policy_arns   = []
    max_session_duration  = 3600
    path                  = "/"
    permissions_boundary  = null

}

# terraform import aws_iam_role_policy.iam_role_policy_Uploadfiles terraform-20240521144017349800000005:terraform-20240521144018371400000008
resource "aws_iam_role_policy" "iam_role_policy_Uploadfiles" {
    name        = "terraform-20240521144018371400000008"
    policy      = jsonencode(
        {
            Statement = [
                {
                    Action   = [
                        "s3:PutObject*",
                        "s3:Abort*",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_s3_bucket.s3_bucket_origin.arn}",
                        "${aws_s3_bucket.s3_bucket_origin.arn}/*",
                    ]
                },
            ]
            Version   = "2012-10-17"
        }
    )
    role        = aws_iam_role.iam_role_Uploadfiles.name
}

resource "aws_iam_role_policy" "iam_role_policy_origin_oncreate_OnMessage" {
    name        = "terraform-20240521144018416300000009"
    policy      = jsonencode(
        {
            Statement = [
                {
                    Action   = [
                        "s3:PutObject*",
                        "s3:Abort*",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_s3_bucket.s3_bucket_backup.arn}",
                        "${aws_s3_bucket.s3_bucket_backup.arn}/*",
                    ]
                },
                {
                    Action   = [
                        "s3:List*",
                        "s3:GetObject*",
                        "s3:GetBucket*",
                    ]
                    Effect   = "Allow"
                    Resource = [
                        "${aws_s3_bucket.s3_bucket_origin.arn}",
                        "${aws_s3_bucket.s3_bucket_origin.arn}/*",
                    ]
                },
            ]
            Version   = "2012-10-17"
        }
    )
    role        = aws_iam_role.iam_role_origin_oncreate_OnMessage.name
}

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_Uploadfiles" {
    depends_on = [ aws_iam_role.iam_role_Uploadfiles ]
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    role       = aws_iam_role.iam_role_Uploadfiles.name
}


resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_oncreate_OnMessage" {
    depends_on = [ aws_iam_role.iam_role_origin_oncreate_OnMessage ]
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
    role       = aws_iam_role.iam_role_origin_oncreate_OnMessage.name
}

  # aws_lambda_function.Uploadfiles will be created
# terraform import aws_lambda_function.lambda_function_Uploadfiles Upload-files-c852a97c
resource "aws_lambda_function" "lambda_function_Uploadfiles" {
    architectures                  = [
        "arm64",
    ]

    code_signing_config_arn        = null
    description                    = null
    function_name                  = "Upload-files-c852a97c"
    handler                        = "index.handler"
    image_uri                      = null
    kms_key_arn                    = null

    memory_size                    = 1024
    package_type                   = "Zip"
    publish                        = true
    # qualified_arn                  = "arn:aws:lambda:eu-west-1:911328334795:function:Upload-files-c852a97c:1"
    # qualified_invoke_arn           = "arn:aws:apigateway:eu-west-1:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-1:911328334795:function:Upload-files-c852a97c:1/invocations"
    reserved_concurrent_executions = -1
    role                           = aws_iam_role.iam_role_Uploadfiles.arn
    runtime                        = "nodejs18.x" #"nodejs20.x"
    s3_bucket                      = aws_s3_bucket.s3_bucket_Code.id
    # s3_key                         = "asset.c852a97c1df2fbe0b928a2acc6062e52a3581ef0b0.1bf051751443bc548e350f1e05cb3fdd.zip"
    s3_key                         = "Uploadfiles.zip"
    skip_destroy                   = false

    timeout                        = 60

    environment {
        variables = {
            "BUCKET_NAME_ac1e5b01" = "origin-c8f13b3c-20240521144017346400000002"
            "NODE_OPTIONS"         = "--enable-source-maps"
            "WING_FUNCTION_NAME"   = "Upload-files-c852a97c"
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

  # aws_lambda_function.origin_oncreate-OnMessage0_D9AC887C will be created
resource "aws_lambda_function" "lambda_function_origin_oncreate_OnMessage" {
    architectures                  = [
        "arm64",
    ]

    code_signing_config_arn        = null
    description                    = null
    function_name                  = "oncreate-OnMessage0-c8f91248"
    handler                        = "index.handler"

    image_uri                      = null

    kms_key_arn                    = null

    memory_size                    = 1024
    package_type                   = "Zip"
    publish                        = true

    reserved_concurrent_executions = -1
    role                           = aws_iam_role.iam_role_origin_oncreate_OnMessage.arn
    runtime                        = "nodejs18.x"
    s3_bucket                      = aws_s3_bucket.s3_bucket_Code.id
    # s3_key                         = "asset.c8f912489d6e2cd5859aee25d45a000c54fa1a54b1.9bc5054c17b66ceb836c7c93a77d42be.zip"
    s3_key                         = "origin_oncreate_OnMessage.zip"
    signing_job_arn                = null
    signing_profile_version_arn    = null
    skip_destroy                   = false

    timeout                        = 60

    environment {
        variables = {
            "BUCKET_NAME_94e6cce2" = "backup-c8f6e5f7-20240521144017348300000003"
            "BUCKET_NAME_ac1e5b01" = "origin-c8f13b3c-20240521144017346400000002"
            "NODE_OPTIONS"         = "--enable-source-maps"
            "WING_FUNCTION_NAME"   = "oncreate-OnMessage0-c8f91248"
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

# FUNCTION_NAME/STATEMENT_ID
# terraform import aws_lambda_permission.lambda_permission_origin_oncreate_OnMessage oncreate-OnMessage0-c8f91248/terraform-2024052114403256650000000a
resource "aws_lambda_permission" "lambda_permission_origin_oncreate_OnMessage" {
    depends_on = [ aws_lambda_function.lambda_function_origin_oncreate_OnMessage ]
    function_name       = "oncreate-OnMessage0-c8f91248"
    principal           = "sns.amazonaws.com"
    qualifier           = null
    action              = "lambda:InvokeFunction"
    source_arn          = aws_sns_topic.sns_topic_origin_oncreate.arn

}

# aws_s3_bucket.Code:
# terraform import aws_s3_bucket.s3_bucket_Code code-c84a50b1-20240521144017345900000001
resource "aws_s3_bucket" "s3_bucket_Code" {
    bucket                      = "code-c84a50b1-20240521144017345900000001"
    force_destroy               = true
    object_lock_enabled         = false


    # request_payer               = "BucketOwner"

    # grant {
    #     permissions = [
    #         "FULL_CONTROL",
    #     ]
    #     type        = "CanonicalUser"
    # }

}

# resource "aws_s3_bucket_acl" "s3_bucket_Code_acl" {
#   bucket = aws_s3_bucket.s3_bucket_Code.id
#   acl    = "private"
# }

resource "aws_s3_bucket_versioning" "s3_bucket_Code_versioning" {
  bucket = aws_s3_bucket.s3_bucket_Code.id
  versioning_configuration {
    status = "Enabled"
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

resource "aws_s3_bucket" "s3_bucket_backup" {
    bucket                      = "backup-c8f6e5f7-20240521144017348300000003"
    force_destroy               = true

    object_lock_enabled         = false


    # request_payer               = "BucketOwner"

    # grant {
    #     permissions = [
    #         "FULL_CONTROL",
    #     ]
    #     type        = "CanonicalUser"
    #     uri         = null
    # }


}

# resource "aws_s3_bucket_acl" "s3_bucket_backup_acl" {
#   bucket = aws_s3_bucket.s3_bucket_backup.id
#   acl    = "private"
# }

resource "aws_s3_bucket_versioning" "s3_bucket_backup_versioning" {
  bucket = aws_s3_bucket.s3_bucket_backup.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_backup_server_side_encryption_configuration" {
    bucket = aws_s3_bucket.s3_bucket_backup.id

    rule {
        bucket_key_enabled = false

        apply_server_side_encryption_by_default {
            kms_master_key_id = null
            sse_algorithm     = "AES256"
        }
    }
}

# aws_s3_bucket.origin:
resource "aws_s3_bucket" "s3_bucket_origin" {
    bucket                      = "origin-c8f13b3c-20240521144017346400000002"
    force_destroy               = true

    object_lock_enabled         = false

    # grant {
    #     permissions = [
    #         "FULL_CONTROL",
    #     ]
    #     type        = "CanonicalUser"
    #     uri         = null
    # }

}

resource "aws_s3_bucket_acl" "s3_bucket_origin_acl" {
  bucket = aws_s3_bucket.s3_bucket_origin.id
  acl    = "private"
}

resource "aws_s3_bucket_versioning" "s3_bucket_origin_versioning" {
  bucket = aws_s3_bucket.s3_bucket_origin.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "s3_bucket_origin_server_side_encryption_configuration" {
    bucket = aws_s3_bucket.s3_bucket_origin.id

    rule {
        bucket_key_enabled = false

        apply_server_side_encryption_by_default {
            kms_master_key_id = null
            sse_algorithm     = "AES256"
        }
    }
}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_origin_ownership_controls" {
  bucket = aws_s3_bucket.s3_bucket_origin.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

# terraform import aws_s3_bucket_notification.s3_bucket_origin_notification  origin-c8f13b3c-202405211440173464000
resource "aws_s3_bucket_notification" "s3_bucket_origin_notification" {
    bucket      = aws_s3_bucket.s3_bucket_origin.id
    eventbridge = false

    topic {
        events        = [
            "s3:ObjectCreated:Put",
        ]
        filter_prefix = null
        filter_suffix = null

        topic_arn     = aws_sns_topic.sns_topic_origin_oncreate.arn
    }

    # topic {
    #     topic_arn     = aws_s3_bucket.s3_bucket_origin.arn
    #     events        = ["s3:ObjectCreated:*"]
    #     filter_suffix = ".log"
    # }
}

# terraform import aws_sns_topic.sns_topic_origin_oncreate arn:aws:sns:eu-west-1:911328334795:oncreate-c81520ac
resource "aws_sns_topic" "sns_topic_origin_oncreate" {
    name                                     = "oncreate-c81520ac"
    application_failure_feedback_role_arn    = null
    application_success_feedback_role_arn    = null
    application_success_feedback_sample_rate = 0

    content_based_deduplication              = false
    delivery_policy                          = null
    display_name                             = null
    fifo_topic                               = false
    firehose_failure_feedback_role_arn       = null
    firehose_success_feedback_role_arn       = null
    firehose_success_feedback_sample_rate    = 0
    http_failure_feedback_role_arn           = null
    http_success_feedback_role_arn           = null
    http_success_feedback_sample_rate        = 0
    kms_master_key_id                        = null
    lambda_failure_feedback_role_arn         = null
    lambda_success_feedback_role_arn         = null
    lambda_success_feedback_sample_rate      = 0

    name_prefix                              = null
    #policy                                   = data.aws_iam_policy_document.iam_policy_document_sns_topic_origin_oncreate.json
    # policy                                   = jsonencode(
    #     {
    #         Id        = "__default_policy_ID"
    #         Statement = [
    #             {
    #                 Action    = [
    #                     "SNS:GetTopicAttributes",
    #                     "SNS:SetTopicAttributes",
    #                     "SNS:AddPermission",
    #                     "SNS:RemovePermission",
    #                     "SNS:DeleteTopic",
    #                     "SNS:Subscribe",
    #                     "SNS:ListSubscriptionsByTopic",
    #                     "SNS:Publish",
    #                 ]
    #                 Condition = {
    #                     StringEquals = {
    #                         "AWS:SourceOwner" = "911328334795"
    #                     }
    #                 }
    #                 Effect    = "Allow"
    #                 Principal = {
    #                     AWS = "*"
    #                 }
    #                 Resource  = "arn:aws:sns:eu-west-1:911328334795:oncreate-c81520ac"
    #                 Sid       = "__default_statement_ID"
    #             },
    #         ]
    #         Version   = "2008-10-17"
    #     }
    # )

    sqs_failure_feedback_role_arn            = null
    sqs_success_feedback_role_arn            = null
    sqs_success_feedback_sample_rate         = 0

    tracing_config                           = null
}


# real policy deployed
# {
#   "Version": "2008-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "s3.amazonaws.com"
#       },
#       "Action": "sns:Publish",
#       "Resource": "arn:aws:sns:eu-west-1:911328334795:oncreate-c81520ac",
#       "Condition": {
#         "ArnEquals": {
#           "aws:SourceArn": "arn:aws:s3:::origin-c8f13b3c-20240521144017346400000002"
#         }
#       }
#     }
#   ]
# }

resource "aws_sns_topic_policy" "sns_topic_policy_origin_oncreate" {
  arn = aws_sns_topic.sns_topic_origin_oncreate.arn

  policy = data.aws_iam_policy_document.iam_policy_document_sns_topic_origin_oncreate.json
}

data "aws_iam_policy_document" "iam_policy_document_sns_topic_origin_oncreate" {
  statement {
    sid       = ""
    effect    = "Allow"
    resources =  [ aws_sns_topic.sns_topic_origin_oncreate.arn ]#["arn:aws:sns:eu-west-1:911328334795:oncreate-c81520ac"]
    actions   = ["sns:Publish"]

    condition {
      test     = "ArnEquals" # test     = "ArnLike"
      variable = "aws:SourceArn"
      values   = [aws_s3_bucket.s3_bucket_origin.arn]
    }

    principals {
      type        = "Service"
      identifiers = ["s3.amazonaws.com"]
    }
  }
}

# terraform import aws_sns_topic_subscription.sns_topic_subscription_origin_oncreate arn:aws:sns:eu-west-1:911328334795:oncreate-c81520ac:c08d1abc-ce55-428e-a669-61fba6c01d39
resource "aws_sns_topic_subscription" "sns_topic_subscription_origin_oncreate" {

    confirmation_timeout_in_minutes = 1
    delivery_policy                 = null
    endpoint                        = aws_lambda_function.lambda_function_origin_oncreate_OnMessage.arn
    endpoint_auto_confirms          = false
    filter_policy                   = null
    filter_policy_scope             = null
    protocol                        = "lambda"
    raw_message_delivery            = false
    subscription_role_arn           = null
    topic_arn                       = aws_sns_topic.sns_topic_origin_oncreate.arn
}

data "archive_file" "lambda_Uploadfiles" {
  type = "zip"
  #source_file = "connect/app.py"
  source_dir  = "assets/Uploadfiles"
  output_path = "Uploadfiles.zip"
}

resource "aws_s3_object" "s3_object_Uploadfiles" {
    bucket                        = aws_s3_bucket.s3_bucket_Code.id
    cache_control                 = null

    content_disposition           = null
    content_encoding              = null
    content_language              = null
    content_type                  = "application/octet-stream"

    force_destroy                 = false
    source       = data.archive_file.lambda_Uploadfiles.output_path
    # content_type = "application/zip"
    # key                           = "asset.c852a97c1df2fbe0b928a2acc6062e52a3581ef0b0.1bf051751443bc548e350f1e05cb3fdd.zip"
    key                           = "Uploadfiles.zip"
    object_lock_legal_hold_status = null
    object_lock_mode              = null
    object_lock_retain_until_date = null
    server_side_encryption        = "AES256"
    # source                        = "assets/Uploadfiles_Asset_90F2EC29/5BE3CDB8A2330294D85291FE94AAB165/archive.zip"
    storage_class                 = "STANDARD"
    # etag                   = filemd5("${path.module}/fargate-lab/${each.key}")

}

data "archive_file" "lambda_origin_oncreate_OnMessage" {
  type = "zip"
  #source_file = "connect/app.py"
  source_dir  = "assets/origin_oncreate_OnMessage"
  output_path = "origin_oncreate_OnMessage.zip"
}

resource "aws_s3_object" "s3_object_origin_oncreate_OnMessage" {
    bucket                        = aws_s3_bucket.s3_bucket_Code.id
    bucket_key_enabled            = false
    cache_control                 = null

    content_disposition           = null
    content_encoding              = null
    content_language              = null
    content_type                  = "application/octet-stream"
    # etag                          = filemd5("${path.module}/fargate-lab/${each.key}")
    force_destroy                 = false

    key                           = "origin_oncreate_OnMessage.zip"
    # key                           = "asset.c8f912489d6e2cd5859aee25d45a000c54fa1a54b1.9bc5054c17b66ceb836c7c93a77d42be.zip"
    object_lock_legal_hold_status = null
    object_lock_mode              = null
    object_lock_retain_until_date = null
    server_side_encryption        = "AES256"
    # source                        = "assets/origin_oncreate-OnMessage0_Asset_AF42FB2E/140B2919CE44D7C876AB4A4DE843AE3D/archive.zip"
    storage_class                 = "STANDARD"



    source       = data.archive_file.lambda_origin_oncreate_OnMessage.output_path
    # content_type = "application/zip"
}

# locals {
#   mime_types = {
#     "css"      = "text/css"
#     "html"     = "text/html"
#     "ico"      = "image/vnd.microsoft.icon"
#     "js"       = "application/javascript"
#     "json"     = "application/json"
#     "map"      = "application/json"
#     "png"      = "image/png"
#     "svg"      = "image/svg+xml"
#     "txt"      = "text/plain"
#     "jpeg"     = "image/jpeg"
#     "DS_Store" = "text/plain"
#     "gif"      = "image/gif"
#     "zip"      = "application/x-zip-compressed"
#   }
# }

# resource "aws_s3_object" "s3_bucket_web_kinesis_content" {
#   for_each = fileset("${path.module}/fargate-lab/", "**/*.*")

#   bucket                 = aws_s3_bucket.s3_bucket_ecs_fargate.id
#   key                    = "/fargate-lab/${each.key}"
#   source                 = "${path.module}/fargate-lab/${each.key}"
#   cache_control          = trimprefix(".js", "${path.module}/fargate-lab/${each.key}") == ".js" || trimprefix(".css", "${path.module}/fargate-lab/${each.key}") == ".css" ? "max-age=31536000, public" : null
#   content_type           = lookup(tomap(local.mime_types), element(split(".", each.key), length(split(".", each.key)) - 1))
#   etag                   = filemd5("${path.module}/fargate-lab/${each.key}")
#   server_side_encryption = "AES256"
#   storage_class          = "STANDARD"
# }