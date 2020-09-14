#-----------------------------------------------------------
#terraform import aws_db_proxy.proxy 
#-------------------------------------------------------------------------------------------
resource "aws_db_proxy" "proxy" {
  name                   = "lambdaproxy"
  debug_logging          = true
  engine_family          = "MYSQL"
  #number in secunds of the connection time out.
  idle_client_timeout    = 1800
  require_tls            = true
  role_arn               = aws_iam_role.rds-proxy-role.arn
  vpc_security_group_ids = [aws_security_group.proxy-sg.id]
  #allow only the private subnets that uses the db.
  vpc_subnet_ids         = [module.vpc.private_subnets]

  auth {
    auth_scheme = "SECRETS"
    description = "the proxy uses secrect manager and iam to authenticate to the db"
    #iam_auth    = "DISABLED"
    iam_auth    = "REQUIRED"
    secret_arn  = aws_secretsmanager_secret.proxy-secret.arn
  }

  tags = {
    Name =  "${local.default_name}-proxy"
  }
}
#-------------------------------------------------------------------------------------------
output "dbProxy-endpoint" {
  value = aws_db_proxy.proxy.endpoint
}
#-------------------------------------------------------------------------------------------
output "dbProxy-arn" {
  value = aws_db_proxy.proxy.arn
}
#-------------------------------------------------------------------------------------------
