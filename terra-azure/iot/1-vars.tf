#-------------------------------------------------------------------
locals {
  default_name = join("-", tolist([ terraform.workspace, "dcs-iot-test"]))
}
#-------------------------------------------------------------------
locals {
  instance_count = 2
}
#-------------------------------------------------------------------
variable "location" {
  default = "East US"
}
#-------------------------------------------------------------------
data "azurerm_subscription" "current" {
}

output "current_subscription_display_name" {
  value = data.azurerm_subscription.current.display_name
}

output "current_subscription_subscription_id" {
  value = data.azurerm_subscription.current.subscription_id
}
#-------------------------------------------------------------------