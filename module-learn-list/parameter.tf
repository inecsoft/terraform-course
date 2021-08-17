#--------------------------------------------------------
locals {
  parameters = {
    env     = ["dev", "stage", "prod"]
    version = ["1.0", "2.0", "3.0"]
    key     = ["value1", "value2", "value3"]
  }
}
#--------------------------------------------------------
module "parameters" {
  for_each = local.parameters
  source   = "./ssm-parameter"
  name     = each.key
  value    = element(each.value, 0)
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