#-------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "${local.default_name}-rg"
  location = var.location
}
#-------------------------------------------------------------------
