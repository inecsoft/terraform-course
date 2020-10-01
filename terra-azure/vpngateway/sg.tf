#---------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "nsgs" {
   name         = "${local.default_name}-nsgs-rg"
   location     = var.loc

   tags         = {
       Name     = "${local.default_name}-nsgs-rg"
   }
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_group" "resource_group_default" {
   name = "${local.default_name}-sg"
   resource_group_name  = azurerm_resource_group.nsgs.name
   location             = azurerm_resource_group.nsgs.location

   tags                 = {
       Name = "${local.default_name}-sg"
   }
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_rule" "AllowSSH" {
    name = "${local.default_name}-AllowSSH"
    resource_group_name         = azurerm_resource_group.nsgs.name
    network_security_group_name = azurerm_network_security_group.resource_group_default.name

    priority                    = 1010
    access                      = "Allow"
    direction                   = "Inbound"
    protocol                    = "Tcp"
    destination_port_range      = 22
    destination_address_prefix  = "*"
    source_port_range           = "*"
    source_address_prefix       = "*"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_rule" "AllowHTTP" {
    name = "${local.default_name}-AllowHTTP"
    resource_group_name         = azurerm_resource_group.nsgs.name
    network_security_group_name = azurerm_network_security_group.resource_group_default.name

    priority                    = 1020
    access                      = "Allow"
    direction                   = "Inbound"
    protocol                    = "Tcp"
    destination_port_range      = 80
    destination_address_prefix  = "*"
    source_port_range           = "*"
    source_address_prefix       = "*"
}

#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_rule" "AllowHTTPS" {
    name = "${local.default_name}-AllowHTTPS"
    resource_group_name         = azurerm_resource_group.nsgs.name
    network_security_group_name = azurerm_network_security_group.resource_group_default.name

    priority                    = 1021
    access                      = "Allow"
    direction                   = "Inbound"
    protocol                    = "Tcp"
    destination_port_range      = 443
    destination_address_prefix  = "*"
    source_port_range           = "*"
    source_address_prefix       = "*"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_rule" "AllowSQLServer" {
    name = "${local.default_name}-AllowSQLServer"
    resource_group_name         = azurerm_resource_group.nsgs.name
    network_security_group_name = azurerm_network_security_group.resource_group_default.name

    priority                    = 1030
    access                      = "Allow"
    direction                   = "Inbound"
    protocol                    = "Tcp"
    destination_port_range      = 1443
    destination_address_prefix  = "*"
    source_port_range           = "*"
    source_address_prefix       = "*"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_rule" "AllowRDP" {
    name = "${local.default_name}-AllowRDP"
    resource_group_name         = azurerm_resource_group.nsgs.name
    network_security_group_name = azurerm_network_security_group.resource_group_default.name

    priority                    = 1040
    access                      = "Allow"
    direction                   = "Inbound"
    protocol                    = "Tcp"
    destination_port_range      = 3389
    destination_address_prefix  = "*"
    source_port_range           = "*"
    source_address_prefix       = "*"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_group" "nic_ubuntu" {
   name = "${local.default_name}-NIC_Ubuntu"
   resource_group_name  = azurerm_resource_group.nsgs.name
   location             = azurerm_resource_group.nsgs.location
   
    security_rule {
        name                       = "SSH"
        priority                   = 100
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = 22
        source_address_prefix      = "*"
        destination_address_prefix = "*"
   }

  tags                 = { 
      Name = "${local.default_name}-nic_ubuntu"
  }
}
#---------------------------------------------------------------------------------------------
resource "azurerm_network_security_group" "nic_windows" {
   name = "${local.default_name}-NIC_Windows"
   resource_group_name  = azurerm_resource_group.nsgs.name
   location             = azurerm_resource_group.nsgs.location
   
    security_rule {
        name                       = "RDP"
        priority                   = 100
        direction                  = "Inbound"
        access                     = "Allow"
        protocol                   = "Tcp"
        source_port_range          = "*"
        destination_port_range     = 3389
        source_address_prefix      = "*"
        destination_address_prefix = "*"
  }

  tags                 = {
    Name = "${local.default_name}-NIC_Windows"
  }

}
#---------------------------------------------------------------------------------------------