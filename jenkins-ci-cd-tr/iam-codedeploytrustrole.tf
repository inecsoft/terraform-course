#----------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "CodeDeployTrustRole" {
    name               = "${local.default_name}-CodeDeployTrustRole"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2008-10-17",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "Service": "codedeploy.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "CodeDeployTrustRole-Policy" {
    name   = "${local.default_name}-CodeDeployPolicy"
    role   = aws_iam_role.CodeDeployTrustRole.name 
    policy = <<POLICY
{
  "Statement": [
    {
      "Action": [
        "ec2:Describe*"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "autoscaling:CompleteLifecycleAction",
        "autoscaling:DeleteLifecycleHook",
        "autoscaling:DescribeLifecycleHooks",
        "autoscaling:DescribeAutoScalingGroups",
        "autoscaling:PutLifecycleHook",
        "autoscaling:RecordLifecycleActionHeartbeat"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    },
    {
      "Action": [
        "Tag:getResources",
        "Tag:getTags",
        "Tag:getTagsForResource",
        "Tag:getTagsForResourceList"
      ],
      "Resource": [
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------------------------------------

