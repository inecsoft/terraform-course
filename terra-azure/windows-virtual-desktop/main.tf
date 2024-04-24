resource "azurerm_resource_group" "wvd" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_virtual_desktop_workspace" "workspace" {
  name                = "workspace"
  location            = azurerm_resource_group.wvd.location
  resource_group_name = azurerm_resource_group.wvd.name
  friendly_name       = "wvd-admin"
  description         = "A description of my workspace"
}
