#trying with group as best practice does not work

resource "aws_iam_user" "iam_user" {
	name = "secrect_access_cross_account"
	path = "/system/"
	provider                  = aws.prod
}

resource "aws_iam_user_policy" "iam_user_policy" {
  name   = "secrect_access_cross_account_policy"
  provider                  = aws.prod
  user   = aws_iam_user.iam_user.name
  policy =  jsonencode({
	Version = "2012-10-17"
	Statement = [
	{
	Action = [
		"secrectmanager:GetSecrectValue",
	]
	Effect   = "Allow"
	Resource = "${aws_kms_key.kms_key.arn}"
	},
	{
	Action = [
		"kms:Decrypt",
	]
	Effect   = "Allow"
	Resource = "${aws_secretsmanager_secret.secretsmanager_secret.arn}"
	},
	]
	})
}