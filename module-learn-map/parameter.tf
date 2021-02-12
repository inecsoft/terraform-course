#--------------------------------------------------------
locals {
  parameters = {
    data    =  {
      value = "dev",
      type  = "SecureString"
      data_type = "text"
    }
    # version =  [ "1.0", "2.0", "3.0" ]
    # key     =  [ "value1", "value2", "value3" ]
  }
}
#--------------------------------------------------------
module "parameters" {
  for_each    = local.parameters
  source      = "./ssm-parameter"
  name        = each.key
  type        = lookup( each.value, "type", "String" )
  data_type   = lookup( each.value, "data_type", "text" ) 
  value       = lookup( each.value, "value", "default" ) 

}
#--------------------------------------------------------
#each.value for string
#element(each.value, 0) for list
#lookup(each.value, "var-in-map", "default-value") for map
#--------------------------------------------------------
output "arns_ssm_parameters" {
  value = { for key, parameter in module.parameters: "${key}_arn" => parameter.arns_ssm_parameters }
}
#--------------------------------------------------------