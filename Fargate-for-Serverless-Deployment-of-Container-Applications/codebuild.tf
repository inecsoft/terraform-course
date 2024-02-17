data "aws_iam_policy_document" "codebuild_project_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "iam_role_codebuild_project" {
  name               = "iam_role_ecs_fargate"
  assume_role_policy = data.aws_iam_policy_document.codebuild_project_assume_role.json
}

data "aws_iam_policy_document" "iam_policy_document_role_codebuild_project_CodeBuildBasePolicy" {
  statement {
    sid    = ""
    effect = "Allow"

    resources = [
      "arn:aws:logs:${var.AWS_REGION}:${data .aws_caller_identity.current.id}:log-group:/aws/codebuild/${var.codebuild_project_name}",
      "arn:aws:logs:${var.AWS_REGION}:${data .aws_caller_identity.current.id}:log-group:/aws/codebuild/${var.codebuild_project_name}:*",
    ]

    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
  }

  statement {
    sid       = ""
    effect    = "Allow"
    resources = ["arn:aws:s3:::codepipeline-${var.AWS_REGION}-*"]

    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketAcl",
      "s3:GetBucketLocation",
    ]
  }

  statement {
    sid       = ""
    effect    = "Allow"
    resources = ["arn:aws:codebuild:${var.AWS_REGION}:${data .aws_caller_identity.current.id}:report-group/${var.codebuild_project_name}-*"]

    actions = [
      "codebuild:CreateReportGroup",
      "codebuild:CreateReport",
      "codebuild:UpdateReport",
      "codebuild:BatchPutTestCases",
      "codebuild:BatchPutCodeCoverages",
    ]
  }

   statement {
    sid       = ""
    effect    = "Allow"
    resources = [
		"*",
		"${aws_ecr_repository.ecr_repository_fargate.arn}*"
	]

    actions = [
      "ecr:GetAuthorizationToken"
    ]
  }

  statement {
    sid       = ""
    effect    = "Allow"
    resources = [
		"*",
		"${aws_ecr_repository.ecr_repository_fargate.arn}"
	]

    actions = [
		"ecr:BatchCheckLayerAvailability",
		"ecr:BatchGetImage",
		"ecr:CompleteLayerUpload",
		"ecr:GetDownloadUrlForLayer",
		"ecr:InitiateLayerUpload",
		"ecr:PutImage",
		"ecr:UploadLayerPart"
    ]
  }

}

data "aws_iam_policy_document" "iam_policy_document_role_codebuild_project_CodeBuildS3ReadOnlyPolicy" {
  statement {
    sid    = ""
    effect = "Allow"

    resources = [
      "${aws_s3_bucket.s3_bucket_ecs_fargate.arn}/fargate-lab/fargatelab.zip",
      "${aws_s3_bucket.s3_bucket_ecs_fargate.arn}/fargate-lab/fargatelab.zip/*",
    ]

    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
    ]
  }

  statement {
    sid       = ""
    effect    = "Allow"
    resources = ["${aws_s3_bucket.s3_bucket_ecs_fargate.arn}"]

    actions = [
      "s3:ListBucket",
      "s3:GetBucketAcl",
      "s3:GetBucketLocation",
    ]
  }
}

# data "aws_iam_policy_document" "iam_policy_document_role_codebuild_project" {
#   statement {
#     effect = "Allow"

#     actions = [
#       "logs:CreateLogGroup",
#       "logs:CreateLogStream",
#       "logs:PutLogEvents",
#     ]

#     resources = ["*"]
#   }

#   statement {
#     effect = "Allow"

#     actions = [
#       "ec2:CreateNetworkInterface",
#       "ec2:DescribeDhcpOptions",
#       "ec2:DescribeNetworkInterfaces",
#       "ec2:DeleteNetworkInterface",
#       "ec2:DescribeSubnets",
#       "ec2:DescribeSecurityGroups",
#       "ec2:DescribeVpcs",
#     ]

#     resources = ["*"]
#   }

#   statement {
#     effect    = "Allow"
#     actions   = ["ec2:CreateNetworkInterfacePermission"]
#     resources = ["arn:aws:ec2:us-east-1:123456789012:network-interface/*"]

#     condition {
#       test     = "StringEquals"
#       variable = "ec2:Subnet"

#       values = [
#         aws_subnet.example1.arn,
#         aws_subnet.example2.arn,
#       ]
#     }

#     condition {
#       test     = "StringEquals"
#       variable = "ec2:AuthorizedService"
#       values   = ["codebuild.amazonaws.com"]
#     }
#   }

#   statement {
#     effect  = "Allow"
#     actions = ["s3:*"]
#     resources = [
#       aws_s3_bucket.example.arn,
#       "${aws_s3_bucket.example.arn}/*",
#     ]
#   }
# }

resource "aws_iam_role_policy" "iam_role_policy_codebuild_project_CodeBuildBasePolicy" {
  role   = aws_iam_role.iam_role_codebuild_project.name
  policy = data.aws_iam_policy_document.iam_policy_document_role_codebuild_project_CodeBuildBasePolicy.json
}

resource "aws_iam_role_policy" "iam_role_policy_codebuild_project_CodeBuildS3ReadOnlyPolicy" {
  role   = aws_iam_role.iam_role_codebuild_project.name
  policy = 	data.aws_iam_policy_document.iam_policy_document_role_codebuild_project_CodeBuildS3ReadOnlyPolicy.json
}

variable "codebuild_project_name" {
	type = string
	default = "fargate-project"
	# default = "ecs_fargate_codebuild_project"
}

# terraform import aws_codebuild_project.name project-name
resource "aws_codebuild_project" "codebuild_project" {
	name          = "${var.codebuild_project_name}"
	description   = "ecs_fargate_codebuild_project"
	build_timeout          = 60
	badge_enabled          = false
	queued_timeout         = 480
	encryption_key         = "arn:aws:kms:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:alias/aws/s3"
	# service_role           = "arn:aws:iam::${data .aws_caller_identity.current.id}:role/service-role/ecs-fargate-serverless-test"
	# concurrent_build_limit = 0
	service_role  = aws_iam_role.iam_role_codebuild_project.arn

	artifacts {
		encryption_disabled    = false
		override_artifact_name = false
		type                   = "NO_ARTIFACTS"
	}

	cache {
		modes = []
		type  = "NO_CACHE"
	}

	environment {
		compute_type                = "BUILD_GENERAL1_SMALL"
		image                       = "aws/codebuild/standard:7.0"
		image_pull_credentials_type = "CODEBUILD"
		privileged_mode             = true
		type                        = "LINUX_CONTAINER"

		environment_variable {
			name  = "AWS_ACCOUNT_ID"
			type  = "PLAINTEXT"
			value = "${data.aws_caller_identity.current.id}"
		}
	}

	#   logs_config {
	#     cloudwatch_logs {
	#       group_name  = "log-group"
	#       stream_name = "log-stream"
	#     }

	#     s3_logs {
	#       status   = "ENABLED"
	#       location = "${aws_s3_bucket.example.id}/build-log"
	#     }
	#   }

	logs_config {
		cloudwatch_logs {
			status = "ENABLED"
		}
		s3_logs {
			encryption_disabled = false
			status              = "DISABLED"
		}
	}

	# source {
	# 	git_clone_depth     = 0
	# 	insecure_ssl        = false
  #   location            = "${aws_s3_bucket.s3_bucket_ecs_fargate.bucket}/fargate-lab/fargatelab.zip"
	# 	#location            = "bucketecsfargate/fargate-lab/fargatelab.zip"
	# 	report_build_status = false
	# 	type                = "S3"
	# }

  source {
    git_clone_depth     = 0
    type                = "S3"
    report_build_status = false
    insecure_ssl        = false
    location            = "${aws_s3_bucket.s3_bucket_ecs_fargate.bucket}/fargate-lab/fargatelab.zip"
    buildspec           = <<-EOT
          version: 0.2

          phases:
            pre_build:
              commands:
                - echo Logging in to Amazon ECR...
                - aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
            build:
              commands:
                - echo Build started on `date`
                - echo Building the Docker image...
                - docker build -t ${aws_ecr_repository.ecr_repository_fargate.name}:testblue .
                - docker tag ${aws_ecr_repository.ecr_repository_fargate.name}:testblue $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/${aws_ecr_repository.ecr_repository_fargate.name}:testblue
            post_build:
              commands:
                - echo Build completed on `date`
                - echo Pushing the Docker image...
                - docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/${aws_ecr_repository.ecr_repository_fargate.name}:testblue
    EOT
  }

	#   source_version = "master"

	#   vpc_config {
	#     vpc_id = aws_vpc.example.id

	#     subnets = [
	#       aws_subnet.example1.id,
	#       aws_subnet.example2.id,
	#     ]

	#     security_group_ids = [
	#       aws_security_group.example1.id,
	#       aws_security_group.example2.id,
	#     ]
	#   }

	tags = {
		Environment = "codebuild_project"
	}
}

