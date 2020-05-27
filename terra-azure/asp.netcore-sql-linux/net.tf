#-----------------------------------------------------------------------
#resource "azurerm_network_ddos_protection_plan" "ddospplan" {
#  name                = "${local.default_name}-ddospplan"
#  location            = azurerm_resource_group.rg.location
#  resource_group_name = azurerm_resource_group.rg.name
#}
#-----------------------------------------------------------------------
resource "azurerm_virtual_network" "vnet" {
  name                = "${local.default_name}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

#  ddos_protection_plan {
#    id     = azurerm_network_ddos_protection_plan.ddospplan.id
#    enable = true
#  }


  tags = {
    Env = "${terraform.workspace}"
  }
}
#-----------------------------------------------------------------------
resource "azurerm_subnet" "sub-net-frontend" {
  name                 = "${local.default_name}-sub-net-frontend"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [ "10.0.1.0/24" ]
}
#-----------------------------------------------------------------------
resource "azurerm_subnet" "sub-net-backend" {
  name                 = "${local.default_name}-sub-net-backend"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [ "10.0.2.0/24" ]
}
#-----------------------------------------------------------------------
resource "azurerm_subnet" "sub-net-database" {
  name                 = "${local.default_name}-sub-net-database"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = [ "10.0.3.0/24" ]
  service_endpoints    = [ "Microsoft.Sql", "Microsoft.Storage" ]

  delegation {
    name = "${local.default_name}-acc-delegation"

    service_delegation {
      name    = "Microsoft.ContainerInstance/containerGroups"
      actions = ["Microsoft.Network/virtualNetworks/subnets/join/action",
         "Microsoft.Network/virtualNetworks/subnets/prepareNetworkPolicies/action"]
    }
  }
}
#-----------------------------------------------------------------------
resource "azurerm_sql_virtual_network_rule" "sql-vnet-rule" {
  count               = 1 
  name                = "${local.default_name}-sql-vnet-rule-${count.index+1}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = element([azurerm_sql_server.sql-server-1.name], count.index)
  subnet_id           = azurerm_subnet.sub-net-database.id
}
#-----------------------------------------------------------------------

