resource "aws_secretsmanager_secret" "secretsmanager_secret" {
	name = "secretsmanager_secret"
	kms_key_id    = aws_kms_key.kms_key.id
	description                    = "secrect to access cross accounts projects"
}

resource "aws_secretsmanager_secret_policy" "secretsmanager_secret_policy" {
  secret_arn = aws_secretsmanager_secret.secretsmanager_secret.arn

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
	{
	  "Sid": "EnableAllPermissions",
	  "Effect": "Allow",
	  "Principal": {
		"AWS": "*"
	  },
	  "Action": "secretsmanager:GetSecretValue",
	  "Resource": "*"
	},
	{
	  "Effect": "Allow",
	  "Principal": {
		"AWS": "${aws_iam_user.iam_user.arn}"
	  },
	  "Action": "secretsmanager:GetSecretValue",
	  "Resource": "*",
	  "Condition": {"ForAnyValue:StringEquals": {"secretmanager:VersionStage": "AWSCURRENT"}}
	}
  ]
}
POLICY
}
resource "aws_secretsmanager_secret_version" "secretsmanager_secret_version" {
	secret_id     = aws_secretsmanager_secret.secretsmanager_secret.id
	#secret_string = "example-string-to-protect"
	secret_string = jsonencode({ username = "Alice", password = "passToken33" })
}