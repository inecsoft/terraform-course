#---------------------------------------------------------
#aws secretsmanager create-secret
# --name "secret_name"
# --description "secret_description"
# --region region_name
# --secret-string '{"username":"db_user","password":"db_user_password"}'
#---------------------------------------------------------
resource "aws_secretsmanager_secret" "proxy-secret" {
  name             = "${local.default_name}-proxysecret-${random_string.random.result}"
  
  recovery_window_in_days = 30

  tags  = {
    "Name " = "${local.default_name}-proxy"
  }
}

#---------------------------------------------------------
# resource "aws_secretsmanager_secret_version" "proxy-secret-version" {
#   secret_id     = aws_secretsmanager_secret.proxy-secret.id
#   secret_string = jsonencode(var.credentials)
# }


resource "aws_secretsmanager_secret_version" "proxy-secret-version" {
  secret_id      = aws_secretsmanager_secret.proxy-secret.id
  #secret_string = "example-string-to-protect"
  #secret_string = "${jsonencode(var.secret)}"
  secret_string  = jsonencode(map("username", var.credentials.username,
                                    "password", random_password.password.result,
                                    "engine", var.credentials.engine,
                                    "host",  module.db.this_db_instance_endpoint,
                                    "port", var.credentials.port,
                                    "dbname", var.credentials.dbname,
                                    "dbInstanceIdentifier", var.credentials.dbInstanceIdentifier
                                    )
                              )
                    
}
#--------------------------------------------------------------------------------
output "secret_version" {
  value = jsondecode(aws_secretsmanager_secret_version.proxy-secret-version.secret_string)["password"]
}
#---------------------------------------------------------
output "aws_secretsmanager_secret_version" {
  value = jsondecode(aws_secretsmanager_secret_version.proxy-secret-version.secret_string)["host"]
}
#---------------------------------------------------------