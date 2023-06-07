resource "aws_cloudtrail" "cloudtrail" {
	name                          = "management-events"
	s3_bucket_name                = aws_s3_bucket.s3_bucket_aws_cloudtrail_logs.id
	#s3_key_prefix                 = "prefix"
	include_global_service_events = true
	cloud_watch_logs_group_arn    = "${aws_cloudwatch_log_group.cloudwatch_log_group_cloudtrail.arn}:*"
	cloud_watch_logs_role_arn     = aws_iam_role.cloudtrail-role-cloudwatchlogs.arn

	is_multi_region_trail         = true

	event_selector {
		read_write_type           = "All"
		include_management_events = true
	}

    /* advanced_event_selector {
		name = "Management events selector"

		field_selector {
			ends_with       = [500]
			equals          = [
				"Management",
			]
			field           = "eventCategory"
			not_ends_with   = [500]
			not_equals      = [100]
			not_starts_with = [100]
			starts_with     = [500]
		}

    } */

}

resource "aws_s3_bucket" "s3_bucket_aws_cloudtrail_logs" {
    bucket = "s3-bucket-cloudtrail-logs-tfgm"
	force_destroy = true

}

resource "aws_s3_bucket_ownership_controls" "s3_bucket_aws_cloudtrail_logs" {
    bucket = aws_s3_bucket.s3_bucket_aws_cloudtrail_logs.id

    rule {
        object_ownership = "BucketOwnerPreferred"
	}
}

resource "aws_s3_bucket_acl" "bucket_acl" {
    acl    = "private"
    bucket = aws_s3_bucket.s3_bucket_aws_cloudtrail_logs.id
}

resource "aws_s3_bucket_policy" "s3_bucket_aws_cloudtrail_logs_policy" {
  bucket = aws_s3_bucket.s3_bucket_aws_cloudtrail_logs.id
  policy = data.aws_iam_policy_document.s3_bucket_aws_cloudtrail_logs_policy_doc.json
}

data "aws_iam_policy_document" "s3_bucket_aws_cloudtrail_logs_policy_doc" {
	statement {
		principals {
		type        = "Service"
		identifiers = [ "cloudtrail.amazonaws.com" ]
		}

		actions = [
			"s3:GetBucketAcl",
		]

		resources = [ aws_s3_bucket.s3_bucket_aws_cloudtrail_logs.arn ]

		condition {
			test     = "StringEquals"
			variable = "AWS:SourceArn"
			values   = [ "arn:aws:cloudtrail:eu-west-1:${data.aws_caller_identity.current.id}:trail/management-events" ]
		}
	}

	statement {
		principals {
			type        = "Service"
			identifiers = [ "cloudtrail.amazonaws.com" ]
		}

		actions = [
			"s3:PutObject",
		]

		resources = [  "${aws_s3_bucket.s3_bucket_aws_cloudtrail_logs.arn}/AWSLogs/${data.aws_caller_identity.current.id}/*" ]

		condition {
			test     = "StringEquals"
			variable = "AWS:SourceArn"
			values   = ["arn:aws:cloudtrail:eu-west-1:${data.aws_caller_identity.current.id}:trail/management-events"]
		}

		condition {
			test     = "StringEquals"
			variable = "s3:x-amz-acl"
			values   = ["bucket-owner-full-control"]
		}
	}


}
resource "aws_iam_policy_attachment" "CloudTrailPolicyForCloudWatchLogs-policy-attachment" {
	name       = "CloudTrailPolicyForCloudWatchLogs-policy-attachment"
    groups     = []
	users      = []

    policy_arn = aws_iam_policy.CloudTrailPolicyForCloudWatchLogs.arn
    roles      = [
        aws_iam_role.cloudtrail-role-cloudwatchlogs.name
    ]

}

resource "aws_iam_policy" "CloudTrailPolicyForCloudWatchLogs" {
	description = "CloudTrail policy to send logs to CloudWatch Logs"
	name        = "CloudTrailPolicyForCloudWatchLogs"
	path        = "/service-role/"
	policy      = jsonencode(
		{
			Statement = [
				{
					Action   = [
						"logs:CreateLogStream",
					]
					Effect   = "Allow"
					Resource = [
						"${aws_cloudwatch_log_group.cloudwatch_log_group_cloudtrail.arn}:log-stream:${data.aws_caller_identity.current.id}_CloudTrail_eu-west-1*",
					]
					Sid      = "AWSCloudTrailCreateLogStream"
				},
				{
					Action   = [
						"logs:PutLogEvents",
					]
					Effect   = "Allow"
					Resource = [
						"${aws_cloudwatch_log_group.cloudwatch_log_group_cloudtrail.arn}:log-stream:${data.aws_caller_identity.current.id}_CloudTrail_eu-west-1*",
					]
					Sid      = "AWSCloudTrailPutLogEvents"
				},
			]
			Version   = "2012-10-17"
		}
	)

}

resource "aws_iam_role" "cloudtrail-role-cloudwatchlogs" {
    name = "cloudtrail-role-cloudwatchlogs"
	path                  = "/service-role/"
    assume_role_policy    = jsonencode(
		{
		Statement = [
			{
				Action    = "sts:AssumeRole"
				Effect    = "Allow"
				Principal = {
					Service = "cloudtrail.amazonaws.com"
					}
				},
			]
		Version   = "2012-10-17"
		}
	)

    force_detach_policies = false

}
