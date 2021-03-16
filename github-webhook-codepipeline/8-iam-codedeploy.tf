#------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-codedeploy" {
  name = "${local.default_name}-iam-role-codedeploy"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "codedeploy.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-policy-attach-codedeploy" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
  role       = aws_iam_role.iam-role-codedeploy.name
}
#------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-policy-attach-codedeploy-lambda" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRoleForLambda"
  role       = aws_iam_role.iam-role-codedeploy.name
}
#------------------------------------------------------------------------------
resource "aws_iam_role_policy" "iam-role-policy-codcodedeploy-sns" {
  name = "${local.default_name}-iam-role-policy-codepipeline"
  role = aws_iam_role.iam-role-codedeploy.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect":"Allow",
      "Action": [
        "kms:DescribeKey",
        "kms:GenerateDataKey*",
        "kms:Encrypt",
        "kms:ReEncrypt*",
        "kms:Decrypt"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
EOF
}
#------------------------------------------------------------------------------
