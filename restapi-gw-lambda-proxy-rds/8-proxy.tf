#-----------------------------------------------------------
#terraform import aws_db_proxy.proxy 
#aws rds describe-db-proxies --query '*[*].{DBProxyName:DBProxyName,Endpoint:Endpoint}'
#mysql -h dev-lambda-lambdaproxy.proxy-cfc8w0uxq929.eu-west-1.rds.amazonaws.com -u admin -p 
#aws rds describe-db-proxy-targets --db-proxy-name 
# describe-db-proxy-target-groups
# describe-db-proxy-targets
# register-db-proxy-targets
#-------------------------------------------------------------------------------------------
#allow only private subnet only when creating. subjected.
#-------------------------------------------------------------------------------------------
resource "aws_db_proxy" "proxy" {
  name                   = "${local.default_name}-lambdaproxy"
  debug_logging          = true
  engine_family          = "MYSQL"
  #number in secunds of the connection time out.
  idle_client_timeout    = 1800
  require_tls            = true
  role_arn               = aws_iam_role.rds-proxy-role.arn
  vpc_security_group_ids = [aws_security_group.proxy-sg.id]
  #allow only the private subnets that uses the db.
  vpc_subnet_ids         = module.vpc.private_subnets

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
#the 2 following resources are not supported by aws provider or terrafrom version
#but the default target can be edit to set the db and lambda can attached resources too.
#-------------------------------------------------------------------------------------------
# resource "aws_db_proxy_default_target_group" "default-target-group" {
#   db_proxy_name = aws_db_proxy.proxy.name

#   connection_pool_config {
#     connection_borrow_timeout    = 120
#     #init_query                   = "SET x=1, y=2"
#     max_connections_percent      = 100
#     max_idle_connections_percent = 50
#     session_pinning_filters      = ["EXCLUDE_VARIABLE_SETS"]
#   }
# }
# #-------------------------------------------------------------------------------------------
# resource "aws_db_proxy_target" "proxy-target" {
#   db_proxy_name          = aws_db_proxy.proxy.db_proxy_name
#   db_instance_identifier = module.db.this_db_instance_id
#   #db_cluster_identifier 
#   target_group_name      = aws_db_proxy_default_target_group.default-target-group.name
# }
#-------------------------------------------------------------------------------------------
output "dbProxy-endpoint" {
  value = aws_db_proxy.proxy.endpoint
}
#-------------------------------------------------------------------------------------------
output "dbProxy-arn" {
  value = aws_db_proxy.proxy.arn
}
#-------------------------------------------------------------------------------------------
