#aws iam create-open-id-connect-provider ‐‐url
#"https://token.actions.githubusercontent.com" ‐‐thumbprint-list
#"6938fd4d98bab03faadb97b34396831e3780aea1" ‐‐client-id-list
#'sts.amazonaws.com'

resource "aws_iam_openid_connect_provider" "iam_openid_connect_provider" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = [
    "sts.amazonaws.com",
  ]

  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

resource "aws_iam_role" "iam_role_GitHubAction-AssumeRoleWithAction" {
  name               = "GitHubAction-AssumeRoleWithAction"
  path               = "/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::911328334795:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo: TfGMEnterprise/*:ref:refs/heads/*"
        }
      }
    }
  ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "test-attach" {
  role       = aws_iam_role.iam_role_GitHubAction-AssumeRoleWithAction.name
  policy_arn = "arn:aws:iam::aws:policy/AdministratorAccess"
}
