#--------------------------------------------------------------------------------
resource "aws_secretsmanager_secret" "rotation-secret" {
  name = "${local.default_name}-rotation-secret-${random_string.random.result}"
  #  rotation_lambda_arn = "${aws_lambda_function.example.arn}"

  #  rotation_rules {
  #   automatically_after_days = 7
  #  }

  kms_key_id = aws_kms_key.kms-key.key_id


  tags = {
    Name = "${local.default_name}-rotation-secret-${random_string.random.result}"
  }
}
#--------------------------------------------------------------------------------
resource "aws_secretsmanager_secret_version" "secret_version" {
  secret_id = aws_secretsmanager_secret.rotation-secret.id
  #secret_string = "example-string-to-protect"
  #secret_string = "${jsonencode(var.secret)}"
  secret_string = jsonencode(map(
    "WEBHOOK_ACCESS_TOKEN", var.credentials.WEBHOOK_ACCESS_TOKEN,
    )
  )
}
#--------------------------------------------------------------------------------
output "secret_version" {
  value = jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["WEBHOOK_ACCESS_TOKEN"]
}
#--------------------------------------------------------------------------------
#variable "secret" {
#  type = map
#  default = {
#      username = "ivanpedro"
#      password = random_password.password.result 
#      engine   = "postgres"
#      host     =  aws_db_instance.postgresdb.endpoint 
#      port     = 5432
#      dbname   = "zappadb"
#      dbInstanceIdentifier = "postgresdb"
#  }
#}
#--------------------------------------------------------------------------------

