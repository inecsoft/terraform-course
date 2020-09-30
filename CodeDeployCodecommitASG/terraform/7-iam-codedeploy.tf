#------------------------------------------------------------------
resource "aws_iam_role" "CodeDeployRole" {
    name               = "${local.default_name}-CodeDeployRole"
    description           = "Allows CodeDeploy to call AWS services such as Auto Scaling on your behalf."
    path               = "/"
    assume_role_policy = <<POLICY
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
POLICY

  tags  = {
    "Name"        = "${local.default_name}-CodeDeployRole"
    "Description" = "codedeploy service role for tutorial"
  }
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "CodeDeployRole-policy-attachment" {
    name       = "${local.default_name}-CodeDeployRole-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
    groups     = []
    users      = []
    roles      = [aws_iam_role.CodeDeployRole.name]
    depends_on = [aws_iam_role.CodeDeployRole]
}
#------------------------------------------------------------------
