#--------------------------------------------------------------------------------------------------
resource "aws_iam_role" "InstanceRole" {
    name               = "${local.default_name}-InstanceRole"
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
#--------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "InstanceRole-policy" {
    name   = "${local.default_name}-InstanceRole-policy"
    role   = aws_iam_role.InstanceRole.name
    policy = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "autoscaling:Describe*",
        "cloudformation:Describe*",
        "cloudformation:GetTemplate",
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
POLICY
}
#--------------------------------------------------------------------------------------------------
resource "aws_iam_instance_profile" "CodeDeployInstanceProfile" {
  name = "${local.default_name}-CodeDeployInstanceProfile"
  path = "/"
  role = aws_iam_role.InstanceRole.name 
}
#------------------------------------------------------------------------------



