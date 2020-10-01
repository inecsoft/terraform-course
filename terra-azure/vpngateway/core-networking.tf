#---------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "core" {
    name        = "${local.default_name}-core-rg"
    location    = var.loc

    tags        = {
        Name = "${local.default_name}-core-rg"
    }

}
#---------------------------------------------------------------------------------------------
resource "azurerm_public_ip" "vpnGatewayPublicIp" {
  name                = "${local.default_name}-vpnGatewayPublicIp"
  location            = azurerm_resource_group.core.location
  resource_group_name = azurerm_resource_group.core.name
    
  #public_ip_address_allocation = "dynamic"

  allocation_method   = "Static"
  sku                 = "Standard"

  tags                = {
    Name = "${local.default_name}-vpnGatewayPublicIp"
  }
}
#---------------------------------------------------------------------------------------------
resource "azurerm_virtual_network" "core" {
   name                 = "${local.default_name}-v-net"
   location             = azurerm_resource_group.core.location
   resource_group_name  = azurerm_resource_group.core.name
   

   address_space        = [ "10.0.0.0/16" ]
   dns_servers          = [ "1.1.1.1", "1.0.0.1" ]

   tags                 = {
        Name = "${local.default_name}-vnet"
   }
}
#---------------------------------------------------------------------------------------------
resource "azurerm_subnet" "GatewaySubnet" {
   name                 = "${local.default_name}-GatewaySubnet"
   resource_group_name  = azurerm_resource_group.core.name
   virtual_network_name = azurerm_virtual_network.core.name

   address_prefixes       = ["10.0.0.0/24" ]
}
#---------------------------------------------------------------------------------------------
resource "azurerm_subnet" "training" {
   name                 = "${local.default_name}-training"
   resource_group_name  = azurerm_resource_group.core.name
   virtual_network_name = azurerm_virtual_network.core.name

   address_prefixes      = ["10.0.1.0/24"]
}
#---------------------------------------------------------------------------------------------
resource "azurerm_subnet" "dev" {
   name                 = "${local.default_name}-dev"
   resource_group_name  = azurerm_resource_group.core.name
   virtual_network_name = azurerm_virtual_network.core.name

  address_prefixes      = ["10.0.2.0/24"]
}
#---------------------------------------------------------------------------------------------
resource "azurerm_virtual_network_gateway" "vpnGateway" {
   name                = "${local.default_name}-vpnGateway"
   location            = azurerm_resource_group.core.location
   resource_group_name = azurerm_resource_group.core.name

   type                = "Vpn"
   vpn_type            = "RouteBased"

   sku                 = "Basic"
   enable_bgp          = true

   ip_configuration {
      name                            = "${local.default_name}-vpnGwConfig"
      public_ip_address_id            = azurerm_public_ip.vpnGatewayPublicIp.id
      private_ip_address_allocation   = "Dynamic"
      subnet_id                       = azurerm_subnet.GatewaySubnet.id
   }

   tags    = {
      Name = "${local.default_name}-vpnGateway"
   }
}
#---------------------------------------------------------------------------------------------