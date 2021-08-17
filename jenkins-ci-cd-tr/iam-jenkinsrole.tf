#-----------------------------------------------------------------------------------------
resource "aws_iam_role" "JenkinsRole" {
  name               = "${local.default_name}-JenkinsRole"
  path               = "/"
  assume_role_policy = <<POLICY
{
  "Version": "2008-10-17",
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
#-----------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "JenkinsRole-Policy" {
  name   = "${local.default_name}-Jenkins-Policy"
  role   = aws_iam_role.JenkinsRole.name
  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "codedeploy:ListApplications",
        "codedeploy:ListDeploymentGroups",
        "codedeploy:RegisterApplicationRevision",
        "codedeploy:CreateDeployment",
        "codedeploy:GetDeploymentConfig",
        "codedeploy:GetApplicationRevision",
        "codedeploy:GetDeployment"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
POLICY
}
#-----------------------------------------------------------------------------------------
resource "aws_iam_instance_profile" "JenkinsInstanceProfile" {
  name = "${local.default_name}-JenkinsInstanceProfile"
  role = aws_iam_role.JenkinsRole.name
}
#------------------------------------------------------------------------------

