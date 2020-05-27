#---------------------------------------------------------------
resource "azurerm_resource_group" "project" {
  name     = "${local.default_name}-resources"
  location = "UK West"
}
#---------------------------------------------------------------
resource "azurerm_virtual_network" "project" {
  name                = "${local.default_name}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.project.location
  resource_group_name = azurerm_resource_group.project.name
}
#---------------------------------------------------------------
resource "azurerm_subnet" "project-public" {
  count                = length(var.subnet_cidr_public)
  name                 = "${local.default_name}-pub-net"
  resource_group_name  = azurerm_resource_group.project.name
  virtual_network_name = azurerm_virtual_network.project.name
  address_prefix       = element(var.subnet_cidr_public, count.index)
}
#---------------------------------------------------------------
resource "azurerm_subnet" "project-private" {
  count                = length(var.subnet_cidr_private)
  name                 = "${local.default_name}-priv-net"
  resource_group_name  = azurerm_resource_group.project.name
  virtual_network_name = azurerm_virtual_network.project.name
  address_prefix       = element(var.subnet_cidr_private, count.index)
}
#---------------------------------------------------------------
resource "azurerm_network_security_group" "project" {
  name                = "${local.default_name}-nsg"
  resource_group_name = azurerm_resource_group.project.name
  location            = azurerm_resource_group.project.location
}
#--------------------------------------------------------------------------------
resource "azurerm_public_ip" "project" {
  name                = "${local.default_name}-pip"
  location            = azurerm_resource_group.project.location
  resource_group_name = azurerm_resource_group.project.name
  allocation_method   = "Static"
  sku                 = "Standard"
}
#--------------------------------------------------------------------------------
# NOTE: this allows SSH from any network
#--------------------------------------------------------------------------------
resource "azurerm_network_security_rule" "ssh" {
  name                        = "${local.default_name}-ssh"
  resource_group_name         = azurerm_resource_group.project.name
  network_security_group_name = azurerm_network_security_group.project.name
  priority                    = 102
  direction                   = "Inbound"
  access                      = "Allow"
  protocol                    = "Tcp"
  source_port_range           = "*"
  destination_port_range      = "22"
  source_address_prefix       = "*"
  destination_address_prefix  = "*"
}
#--------------------------------------------------------------------------------

