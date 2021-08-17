#--------------------------------------------------------
locals {
  parameters = {
    env     = "dev"
    version = "1.0"
    key     = "value"
  }
}
#--------------------------------------------------------
module "parameters" {
  for_each = local.parameters
  source   = "./ssm-parameter"
  name     = each.key
  value    = each.value
}
#--------------------------------------------------------
#each.value for string
#element(each.value, 0) for list
#lookup(each.value, "var-in-map", "default-value") for map
#--------------------------------------------------------
output "arns_ssm_parameters" {
  value = { for key, parameter in module.parameters : "${key}_arn" => parameter.arns_ssm_parameters }
}
#--------------------------------------------------------