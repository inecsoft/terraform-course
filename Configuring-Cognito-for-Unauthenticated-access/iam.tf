resource "aws_iam_role" "cognito_loungebeerUnauth_role" {
	name = "cognito_loungebeerUnauth_role"
	assume_role_policy = <<EOF
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": {
				"Federated": "cognito-identity.amazonaws.com"
			},
			"Action": "sts:AssumeRoleWithWebIdentity",
			"Condition": {
				"ForAnyValue:StringLike": {
					"cognito-identity.amazonaws.com:amr": "unauthenticated"
				}
			}
		}
	]
}
EOF
}

resource "aws_iam_role_policy" "cloud_build_policy" {
  role = aws_iam_role.cognito_loungebeerUnauth_role.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Resource": [
         "*"
      ],
      "Action": [
        "mobileanalytics:PutEvents",
        "cognito-sync:*",
        "firehose:PutRecord",
        "firehose:PutRecordBatch"
      ]
    }
  ]
}
POLICY
}

###################################################################

# resource "aws_iam_role" "firehose_toS3_delivery_iam_role" {
# 	name = "firehose_toS3_delivery"
# 	assume_role_policy = <<EOF
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Sid": "",
#       "Effect": "Allow",
#       "Principal": {
#         "Service": "firehose.amazonaws.com"
#       },
#       "Action": "sts:AssumeRole",
#       "Condition": {
#         "StringEquals": {
#           "sts:ExternalId": "${data.aws_caller_identity.current.id}"
#         }
#       }
#     }
#   ]
# }
# EOF
# }

resource "aws_iam_role" "firehose_toS3_delivery_iam_role" {
	name = "firehose_toS3_delivery"
	assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "firehose.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "firehose_toS3_delivery_iam_role_policy" {
  role = aws_iam_role.firehose_toS3_delivery_iam_role.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:GetBucketLocation",
        "s3:GetObject",
        "s3:ListBucket",
        "s3:ListBucketMultipartUploads",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "${aws_s3_bucket.s3_bucket_kinesis.arn}",
        "${aws_s3_bucket.s3_bucket_kinesis.arn}/*"
      ],
      "Effect": "Allow",
      "Sid": ""
    },
    {
      "Action": [
        "logs:PutLogEvents"
      ],
      "Resource": [
        "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:log-group:/aws/kinesisfirehose/*",
        "arn:aws:logs:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:log-group:${var.cloudwatchloggroupname}:log-stream:*",
        "${aws_cloudwatch_log_group.cloudwatch_log_group.arn}/*"

      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "kinesis:DescribeStream",
        "kinesis:GetShardIterator",
        "kinesis:GetRecords",
        "kinesis:ListShards"
      ],
      "Resource": [
        "arn:aws:kinesis:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:stream/*"
      ],
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": [
        "kms:Decrypt",
        "kms:GenerateDataKey"
      ],
      "Resource": [
        "${aws_kms_key.kms_key.arn}"
      ],
      "Condition": {
        "StringEquals": {
          "kms:ViaService": "s3.${var.AWS_REGION}.amazonaws.com"
        },
        "StringLike": {
          "kms:EncryptionContext:aws:s3:arn": [
            "${aws_s3_bucket.s3_bucket_kinesis.arn}/*",
            "${aws_s3_bucket.s3_bucket_kinesis.arn}"
          ]
        }
      }
    }
  ]
}
POLICY
}
###########################################################################################
