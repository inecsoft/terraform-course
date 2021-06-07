#-------------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-dynamodb" {
  name               = "${local.default_name}-iam-role-dynamodb"
  path               = "/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#-------------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-role-policy-dynamodb" {
  name        = "${local.default_name}-iam-role-policy-dynamodb"
  description = "iam-role-policy-dynamodb"
  policy      = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:DescribeTable",
        "dynamodb:ListTables",
        "dynamodb:UpdateTable",
        "cloudwatch:GetMetricStatistics",
        "s3:PutObject",
        "s3:GetObject"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "sns:Publish"
      ],
      "Resource": [
        "arn:aws:sns:*::dynamic-dynamodb"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF
}
#-------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-dynamodb-attach" {
  name       = "${local.default_name}-iam-role-policy-dynamodb-attach"
  users      = []
  roles      = [aws_iam_role.iam-role-dynamodb.name]
  groups     = []
  policy_arn = aws_iam_policy.iam-role-policy-dynamodb.arn
}
#-------------------------------------------------------------------------------------------
resource "aws_iam_instance_profile" "iam-instance-profile" {
  name = "${local.default_name}-iam-instance-profile"
  role = aws_iam_role.iam-role-dynamodb.name
}
#-------------------------------------------------------------------------------------------