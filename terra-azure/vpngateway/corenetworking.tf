#---------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "core" {
    name        = "${local.default_name}-core-rg"
    location    = var.loc
    tags        = "${local.default_name}-core-rg"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_public_ip" "vpnGatewayPublicIp" {
    name                = "${local.default_name}-vpnGatewayPublicIp"
    location            = azurerm_resource_group.core.location
    resource_group_name = azurerm_resource_group.core.name
    tags                = "${local.default_name}-vpnGatewayPublicIp"

    public_ip_address_allocation = "dynamic"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_virtual_network" "core" {
   name                 = "${local.default_name}-v-net"
   location             = azurerm_resource_group.core.location
   resource_group_name  = azurerm_resource_group.core.name
   tags                 = "${local.default_name}-vnet"

   address_space        = [ "10.0.0.0/16" ]
   dns_servers          = [ "1.1.1.1", "1.0.0.1" ]
}
#---------------------------------------------------------------------------------------------
resource "azurerm_subnet" "GatewaySubnet" {
   name                 = "${local.default_name}-GatewaySubnet"
   resource_group_name  = azurerm_resource_group.core.name
   virtual_network_name = azurerm_virtual_network.core.name

   address_prefix       = "10.0.0.0/24"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_subnet" "training" {
   name                 = "${local.default_name}-training"
   resource_group_name  = azurerm_resource_group.core.name
   virtual_network_name = azurerm_virtual_network.core.name

   address_prefix       = "10.0.1.0/24"
}
#---------------------------------------------------------------------------------------------
resource "azurerm_subnet" "dev" {
   name                 = "${local.default_name}-dev"
   resource_group_name  = azurerm_resource_group.core.name
   virtual_network_name = azurerm_virtual_network.core.name

   address_prefix       = "10.0.2.0/24"
}
#---------------------------------------------------------------------------------------------
# resource "azurerm_virtual_network_gateway" "vpnGateway" {
#     name                = "vpnGateway"
#     location            = "${azurerm_resource_group.core.location}"
#     resource_group_name = "${azurerm_resource_group.core.name}"
#     tags                = "${azurerm_resource_group.core.tags}"
# 
#     type                = "Vpn"
#     vpn_type            = "RouteBased"
# 
#     sku                 = "Basic"
#     enable_bgp          = true
# 
#     ip_configuration {
#         name                            = "vpnGwConfig"
#         public_ip_address_id            = "${azurerm_public_ip.vpnGatewayPublicIp.id}"
#         private_ip_address_allocation   = "Dynamic"
#         subnet_id                       = "${azurerm_subnet.GatewaySubnet.id}"
#     }
# 
# }
#---------------------------------------------------------------------------------------------