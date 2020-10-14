#------------------------------------------------------------------------------------------
resource "aws_iam_user_group_membership" "user-group-membership" {
  user = aws_iam_user.ses-user-1.name

  groups = [
    aws_iam_group.ses-group.name
  ]
}
#------------------------------------------------------------------------------------------
resource "aws_iam_user" "ses-user-1" {
  name = "ses-smtp-user.${random_uuid.uuid.result}"

  tags = {
    Name = "${local.default_name}-ses-user"
  }
}
#------------------------------------------------------------------------------------------
resource "aws_iam_group" "ses-group" {
  name = "${local.default_name}-ses-group"
}
#------------------------------------------------------------------------------------------
resource "aws_iam_policy" "ses-group-policy" {
  name        = "${local.default_name}-ses-group-policy"
  path        = "/"
  description = "${local.default_name}-ses-group-policy Allows group of users to send email via SES"

  policy = <<-EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "ses:SendRawEmail",
            "Resource": "*"
        }
    ]
}
EOF
}
#------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "ses-group-policy-attach" {
  name       = "${local.default_name}-ses-group-policy-attach"
  users      = []
  roles      = []
  groups     = [ aws_iam_group.ses-group.name ]
  policy_arn = aws_iam_policy.ses-group-policy.arn
}
#------------------------------------------------------------------------------------------