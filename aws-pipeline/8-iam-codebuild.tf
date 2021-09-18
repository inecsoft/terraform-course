#------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-codebuild" {
  name = "${local.default_name}-iam-role-codebuild"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#------------------------------------------------------------------------------
resource "aws_iam_role_policy" "iam-role-policy-codebuild" {
  role = aws_iam_role.iam-role-codebuild.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchLogsPolicy",
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    },
    {
      "Sid": "SsmParameter",
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters",
        "ssm:PutParameter"
      ],
      "Resource": "arn:aws:ssm:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:parameter/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterface",
        "ec2:DescribeDhcpOptions",
        "ec2:DescribeNetworkInterfaces",
        "ec2:DeleteNetworkInterface",
        "ec2:DescribeSubnets",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeVpcs"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
         "kms:DescribeKey",
         "kms:GenerateDataKey*",
         "kms:Encrypt",
         "kms:ReEncrypt*",
         "kms:Decrypt"
        ],
      "Resource": [
         "${aws_kms_key.kms-key.arn}"
        ]
    },
    {
      "Effect": "Allow",
      "Action": "codebuild:*",
      "Resource": [
           "${aws_codebuild_project.codebuild-project-prod.id}",
           "${aws_codebuild_project.codebuild-project-dev.id}"
        ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "${aws_s3_bucket.s3-bucket-codepipeline.arn}",
        "${aws_s3_bucket.s3-bucket-codepipeline.arn}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateNetworkInterfacePermission"
      ],
      "Resource": [
        "arn:aws:ec2:${var.AWS_REGION}:${data.aws_caller_identity.current.id}:network-interface/*"
      ]
    }
  ]
}
POLICY
}
#------------------------------------------------------------------------------