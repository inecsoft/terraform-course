#--------------------------------------------------------------------------
resource "aws_iam_role" "role-zappa" {
  name = "${local.default_name}-role-zappa"
  description = "Role policy for project serverless zappa django"

  assume_role_policy = <<-EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com",
          "apigateway.amazonaws.com",
          "events.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF

  tags = {
    Name = "${local.default_name}-role"
  }
}
#--------------------------------------------------------------------------
resource "aws_iam_policy" "role-policy-zappa" {
  name        = "${local.default_name}-role-policy-zappa"
  path        = "/"
  description = "Role policy for project serverless zappa django"

  policy = <<-EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:*"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "lambda:GetFunctionConfiguration",
                "lambda:UpdateFunctionConfiguration",
                "lambda:InvokeFunction"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "xray:PutTraceSegments",
                "xray:PutTelemetryRecords"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Effect": "Allow",
            "Action": [
                "ec2:AttachNetworkInterface",
                "ec2:CreateNetworkInterface",
                "ec2:DeleteNetworkInterface",
                "ec2:DescribeInstances",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DetachNetworkInterface",
                "ec2:ModifyNetworkInterfaceAttribute",
                "ec2:ResetNetworkInterfaceAttribute"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:*"
            ],
            "Resource": "arn:aws:s3:::*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "kinesis:*"
            ],
            "Resource": "arn:aws:kinesis:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "sns:*"
            ],
            "Resource": "arn:aws:sns:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "sqs:*"
            ],
            "Resource": "arn:aws:sqs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:*"
            ],
            "Resource": "arn:aws:dynamodb:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "route53:*"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}

#--------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "role-policy-attach-zappa" {
  name       = "${local.default_name}-role-policy-attachment-zappa"
  users      = []
  roles      = [aws_iam_role.role-zappa.name]
  groups     = []
  policy_arn = aws_iam_policy.role-policy-zappa.arn
}
#--------------------------------------------------------------------------
