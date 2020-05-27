#-------------------------------------------------------------------------------------
resource "azurerm_resource_group" "project" {
  name     = "${local.default_name}-resources"
  location = "West Europe"
}
#-------------------------------------------------------------------------------------
resource "azurerm_virtual_network" "project" {
  name                = "${local.default_name}-vnet"
  address_space       = ["192.168.1.0/24"]
  location            = azurerm_resource_group.project.location
  resource_group_name = azurerm_resource_group.project.name
}
#-------------------------------------------------------------------------------------
resource "azurerm_subnet" "project" {
  name                 = "AzureBastionSubnet"
  resource_group_name  = azurerm_resource_group.project.name
  virtual_network_name = azurerm_virtual_network.project.name
  address_prefix       = "192.168.1.224/27"
}
#-------------------------------------------------------------------------------------
resource "azurerm_public_ip" "project" {
  name                = "${local.default_name}-pip"
  location            = azurerm_resource_group.project.location
  resource_group_name = azurerm_resource_group.project.name
  allocation_method   = "Static"
  sku                 = "Standard"
}
#-------------------------------------------------------------------------------------
resource "azurerm_bastion_host" "project" {
  name                = "${local.default_name}-bastion"
  location            = azurerm_resource_group.project.location
  resource_group_name = azurerm_resource_group.project.name

  ip_configuration {
    name                 = "${local.default_name}-configuration"
    subnet_id            = azurerm_subnet.project.id
    public_ip_address_id = azurerm_public_ip.project.id
  }
}
#-------------------------------------------------------------------------------------
