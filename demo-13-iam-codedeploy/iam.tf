#------------------------------------------------------------------------------
## group definition
resource "aws_iam_group" "g-codedeploy" {
  name = "g-codedeploy"
}
#------------------------------------------------------------------------------
#Grant the IAM group access to CodeDeploy and AWS services and actions CodeDeploy depends on
#------------------------------------------------------------------------------
resource "aws_iam_policy" "codedeploy-group-policy" {
  name        = "codedeploy-group-policy"
  description = "codedeploy-group-policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement" : [
    {
      "Effect" : "Allow",
      "Action" : [
        "autoscaling:*",
        "codedeploy:*",
        "ec2:*",
        "lambda:*",
        "ecs:*",
        "elasticloadbalancing:*",
        "iam:AddRoleToInstanceProfile",
        "iam:CreateInstanceProfile",
        "iam:CreateRole",
        "iam:DeleteInstanceProfile",
        "iam:DeleteRole",
        "iam:DeleteRolePolicy",
        "iam:GetInstanceProfile",
        "iam:GetRole",
        "iam:GetRolePolicy",
        "iam:ListInstanceProfilesForRole",
        "iam:ListRolePolicies",
        "iam:ListRoles",
        "iam:PassRole",
        "iam:PutRolePolicy",
        "iam:RemoveRoleFromInstanceProfile", 
        "s3:*"
      ],
      "Resource" : "*"
    }    
  ]
}
EOF
}
#------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "g-codedeploy-attach" {
  name   = "g-codedeploy-attach"
  groups = [aws_iam_group.g-codedeploy.name]
  #policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
  policy_arn = aws_iam_policy.codedeploy-group-policy.arn

}
#------------------------------------------------------------------------------
# user
#------------------------------------------------------------------------------
resource "aws_iam_user" "deploy1" {
  name = "deploy1"
}
#------------------------------------------------------------------------------
resource "aws_iam_user" "deploy2" {
  name = "deploy2"
}
#------------------------------------------------------------------------------
resource "aws_iam_group_membership" "g-codedeploy-users" {
  name = "g-codedeploy-users"
  users = [
    aws_iam_user.deploy1.name,
    aws_iam_user.deploy2.name,
  ]
  group = aws_iam_group.g-codedeploy.name
}
#------------------------------------------------------------------------------

