#--------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
    name = "${local.default_name}-RG"
    location = "East US 2"
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_server" "sql-server-1" {
  name                         = "${local.default_name}-sqlserver-1"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = "4dm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_server" "sql-server-2" {
  name                         = "${local.default_name}-sqlserver-2"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = "4dm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
resource "azurerm_storage_account" "storage" {
  name                     = "${local.default_name}-storage"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_database" "sql-db" {
  name                = "${local.default_name}-sql-db"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  server_name         = azurerm_sql_server.sql-server-1.name

  extended_auditing_policy {
    storage_endpoint                        = azurerm_storage_account.storage.primary_blob_endpoint
    storage_account_access_key              = azurerm_storage_account.storage.primary_access_key
    storage_account_access_key_is_secondary = true
    retention_in_days                       = 6
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_failover_group" "sql-fail-gp" {
  name                = "${local.default_name}-failover-gp"
  resource_group_name = azurerm_sql_server.sql-server-1.resource_group_name
  server_name         = azurerm_sql_server.sql-server-1.name
  databases           = [azurerm_sql_database.sql-db.id]
  partner_servers {
    id = azurerm_sql_server.sql-server-2.id
  }

  read_write_endpoint_failover_policy {
    mode          = "Automatic"
    grace_minutes = 60
  }
}
#--------------------------------------------------------------------------------------------
#In order to make the firewall more secure allow traffic only from the app
#Azure CLI
#az webapp show --resource-group <group_name> --name <app_name> --query outboundIpAddresses --output tsv
#Azure PowerShell
#(Get-AzWebApp -ResourceGroup <group_name> -name <app_name>).OutboundIpAddresses
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_firewall_rule" "example" {
  name                = "FirewallRule1"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_sql_server.sql-server.name
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------


