#-----------------------------------------------------------------
output "YourIPRange" {
 value  = local.workstation-external-cidr 
}
#-----------------------------------------------------------------
output "account_id" {
  value = data.aws_caller_identity.current.account_id
}
#-----------------------------------------------------------------
output "elb_app_dns_name" {
  value = aws_elb.elb-app.dns_name
}
#-----------------------------------------------------------------
