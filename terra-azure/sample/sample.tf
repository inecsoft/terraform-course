#----------------------------------------------------------------
#Create resourse group in Azure
#---------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "${local.default_name}-ResourceGroup"
  location = "westeurope"
}
#---------------------------------------------------------------
