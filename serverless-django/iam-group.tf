#--------------------------------------------------------------------------
resource "aws_iam_group_membership" "team" {
  name = "${local.default_name}-group-membership-zappa"

  users = [
    aws_iam_user.user_one.name,
  ]

  group = aws_iam_group.group-zappa.name
}
#--------------------------------------------------------------------------
resource "aws_iam_group" "group-zappa" {
  name = "${local.default_name}-group-zappa"
  #path = "/users/"
}

resource "aws_iam_user" "user_one" {
  name = "${local.default_name}-zappa-user"
  force_destroy  = true

  tags = {
    Name  = "${local.default_name}-zappa-user"
  }
}
#--------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "group-policy-attach-zappa-1" {
  name       = "${local.default_name}-role-policy-attachment-zappa"
  users      = []
  roles      = []
  groups     = [aws_iam_group.group-zappa.name]

  policy_arn = aws_iam_policy.policy-s3.arn
}
#--------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "group-policy-attach-zappa" {
  name       = "${local.default_name}-role-policy-attachment-zappa"
  users      = []
  roles      = []
  groups     = [aws_iam_group.group-zappa.name]

  policy_arn =  aws_iam_policy.role-policy-lambda.arn
               
}
#--------------------------------------------------------------------------
resource "aws_iam_policy" "policy-s3" {
  name        = "${local.default_name}-bucket-zappa"
  path        = "/"
  description = "Group-Level Permissions Policy for S3 for Zappa"

  policy = <<-EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:ListBucket"
            ],
            "Resource": [
                "${aws_s3_bucket.s3-bucket.arn}"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:PutObject",
                "s3:CreateMultipartUpload",
                "s3:AbortMultipartUpload",
                "s3:ListMultipartUploadParts",
                "s3:ListBucketMultipartUploads"
            ],
            "Resource": [
                "${aws_s3_bucket.s3-bucket.arn}/*"
            ]
        }
    ]
}
EOF
}
#-----------------------------------------------------------------------
#--------------------------------------------------------------------------
resource "aws_iam_policy" "role-policy-lambda" {
  name        = "${local.default_name}-role-policy-lambda"
  path        = "/"
  description = "Group-Level Permissions Policy for Lambda Role and Zappa Related Events"

  policy      = <<-EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "iam:GetRole",
                "iam:PutRolePolicy"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "iam:PassRole"
            ],
            "Resource": [
                "${aws_iam_role.role-zappa.arn}"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "apigateway:DELETE",
                "apigateway:GET",
                "apigateway:PATCH",
                "apigateway:POST",
                "apigateway:PUT",
                "cloudformation:CreateStack",
                "cloudformation:DeleteStack",
                "cloudformation:DescribeStackResource",
                "cloudformation:DescribeStacks",
                "cloudformation:ListStackResources",
                "cloudformation:UpdateStack",
                "events:DeleteRule",
                "events:DescribeRule",
                "events:ListRules",
                "events:ListRuleNamesByTarget",
                "events:ListTargetsByRule",
                "events:PutRule",
                "events:PutTargets",
                 "events:RemoveTargets",
                "lambda:*",
                "lambda:AddPermission",
                "lambda:CreateFunction",
                "lambda:DeleteFunction",
                "lambda:GetFunction",
                "lambda:GetFunctionConfiguration",
                "lambda:ListVersionsByFunction",
                "lambda:UpdateFunctionCode",
                "logs:DescribeLogStreams",
                "logs:FilterLogEvents",
                "route53:ListHostedZones",
                "route53:ChangeResourceRecordSets",
                "route53:GetHostedZone"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
EOF
}
#--------------------------------------------------------------------------
