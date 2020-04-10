#-------------------------------------------------------------------------------------
resource "azurerm_resource_group" "project" {
  name     = "${local.default_name}-resources"
  location = "${var.location}"
}
#-------------------------------------------------------------------------------------
resource "azurerm_virtual_network" "first" {
  name                = "${local.default_name}-network1"
  resource_group_name = "${azurerm_resource_group.project.name}"
  location            = "${azurerm_resource_group.project.location}"
  address_space       = ["10.0.0.0/24"]

  subnet {
    name           = "${local.default_name}-net-1"
    address_prefix = "10.0.0.0/24"
  }
}
#-------------------------------------------------------------------------------------
resource "azurerm_virtual_network" "second" {
  name                = "${local.default_name}-network2"
  resource_group_name = "${azurerm_resource_group.project.name}"
  location            = "${azurerm_resource_group.project.location}"
  address_space       = ["192.168.0.0/24"]

  subnet {
    name           = "${local.default_name}-net-1"
    address_prefix = "192.168.0.0/24"
  }
}
#-------------------------------------------------------------------------------------
resource "azurerm_virtual_network_peering" "first-to-second" {
  name                         = "${local.default_name}-first-to-second"
  resource_group_name          = "${azurerm_resource_group.project.name}"
  virtual_network_name         = "${azurerm_virtual_network.first.name}"
  remote_virtual_network_id    = "${azurerm_virtual_network.second.id}"
  allow_virtual_network_access = true
  allow_forwarded_traffic      = false
  allow_gateway_transit        = false
}
#-------------------------------------------------------------------------------------
resource "azurerm_virtual_network_peering" "second-to-first" {
  name                         = "${local.default_name}-second-to-first"
  resource_group_name          = "${azurerm_resource_group.project.name}"
  virtual_network_name         = "${azurerm_virtual_network.second.name}"
  remote_virtual_network_id    = "${azurerm_virtual_network.first.id}"
  allow_virtual_network_access = true
  allow_forwarded_traffic      = false
  allow_gateway_transit        = false
  use_remote_gateways          = false
}
#-------------------------------------------------------------------------------------
