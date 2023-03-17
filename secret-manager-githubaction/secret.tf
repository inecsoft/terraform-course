#--------------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "rotation-secret" {
  name = "${local.default_name}-rotation-secret-"
  #  rotation_lambda_arn = "${aws_lambda_function.example.arn}"

  #  rotation_rules {
  #   automatically_after_days = 7
  #  }

  #kms_key_id = aws_kms_key.kms-key.key_id

  tags = {
    Name = "${local.default_name}-rotation-secret"
  }
}
#--------------------------------------------------------------------------------
resource "aws_secretsmanager_secret_version" "secret_version" {
  secret_id = aws_secretsmanager_secret.rotation-secret.id
  #secret_string = "example-string-to-protect"
  #secret_string = "${jsonencode(var.secret)}"
  secret_string = jsonencode(tomap({
    "password" = random_password.password.result
    })
  )

}
#--------------------------------------------------------------------------------
output "secret_version" {
  value = nonsensitive(jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["password"])
}
