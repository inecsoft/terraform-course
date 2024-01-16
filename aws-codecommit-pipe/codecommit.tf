
###################################################
# CODE COMMIT
###################################################

resource "aws_codecommit_repository" "vpc_code" {
  repository_name = "vpc-deploy"
  description     = "Code for deploying VPCs"
}

resource "aws_iam_user_policy_attachment" "code_commit_current" {
  user       = var.code_commit_user
  policy_arn = data.aws_iam_policy.code_commit_power_user.arn
}

###################################################