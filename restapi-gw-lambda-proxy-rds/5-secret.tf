#---------------------------------------------------------
resource "aws_secretsmanager_secret" "proxy-secret" {
  name             = "proxysecret"
  
  recovery_window_in_days = 30

  tags  = {
    "Name " = "${local.default_name}-proxy"
  }
}

#---------------------------------------------------------
resource "aws_secretsmanager_secret_version" "proxy-secret-version" {
  secret_id     = aws_secretsmanager_secret.proxy-secret.id
  secret_string = jsonencode(var.credentials)
}
#---------------------------------------------------------
output "aws_secretsmanager_secret_version" {
  value = jsondecode(aws_secretsmanager_secret_version.proxy-secret-version.secret_string)["host"]
}
#---------------------------------------------------------