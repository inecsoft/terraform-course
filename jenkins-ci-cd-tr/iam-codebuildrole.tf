#------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "CodeBuildRole" {
    name               = "${local.default_name}-CodeBuildRole"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2008-10-17",
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
POLICY
}
#------------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "CodeBuildRole-policy" {
    name   = "${local.default_name}-CodeBuildRole-policy"
    role   = aws_iam_role.CodeBuildRole.name 
    policy = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:PutObject"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
POLICY
}
#------------------------------------------------------------------------------------------------------

