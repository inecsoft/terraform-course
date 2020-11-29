#----------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "cognito-sns-role" {
    name               = "${local.default_name}-cognito-sns-role"
    path               = "/service-role/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "cognito-idp.amazonaws.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "03a4b612-bb98-4bac-ba1c-63faa964a714"
        }
      }
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "cognito-policy-attachment" {
    name       = "${local.default_name}-cognito-policy-attachment"
    policy_arn = aws_iam_policy.cognito-policy.arn
    groups     = []
    users      = []
    roles      = [aws_iam_role.cognito-sns-role.name]
}
#----------------------------------------------------------------------------------------------------------
resource "aws_iam_policy" "cognito-policy" {
    name        = "${local.default_name}-cognito-policy"
    path        = "/service-role/"
    description = ""
    policy      = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "sns:publish"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------------------------------------

