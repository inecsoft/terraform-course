#---------------------------------------------------------------------------------
#get subscription id
#az account list --output table
#---------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "netdevopsproject-rg"
  location = "East US 2"

    tags     = {}
}
#---------------------------------------------------------------------------------
resource "azurerm_resource_group" "vsts" {
  name     = "VstsRG-ivanpedro-6c3f"
  location = "eastus2"

  tags     = {}
}
#---------------------------------------------------------------------------------
#terraform import azurerm_sql_server.example /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myresourcegroup/providers/Microsoft.Sql/servers/myserver
#---------------------------------------------------------------------------------
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
#---------------------------------------------------------------------------------
#terraform import azurerm_sql_database.sql-db /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myresourcegroup/providers/Microsoft.Sql/servers/myserver/databases/database1
#---------------------------------------------------------------------------------
resource "azurerm_sql_database" "sql-db" {
  name                = "${local.default_name}-sql-db"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  server_name         = azurerm_sql_server.sql-server-1.name

  requested_service_objective_name = "S0"

  extended_auditing_policy {
    storage_endpoint                        = azurerm_storage_account.storage.primary_blob_endpoint
    storage_account_access_key              = azurerm_storage_account.storage.primary_access_key
    storage_account_access_key_is_secondary = true
    retention_in_days                       = 6
  }

  threat_detection_policy {
    state            = "Enabled"
    retention_days   = 30
    email_addresses  = ["ivanpedrouk@gmail.com" ]
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------

