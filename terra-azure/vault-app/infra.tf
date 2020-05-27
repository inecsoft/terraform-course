#----------------------------------------------------------------------------------------------
#https://kvaes.wordpress.com/2019/01/22/landscaping-a-secure-closed-loop-infrastructure-in-azure-with-terraform-azure-devops/
#----------------------------------------------------------------------------------------------
resource "random_string" "vault_user" {
   length           = 16
   min_upper        = 4
   min_lower        = 4
   min_numeric      = 4
#   min_special      = 4
   special          = false
#   override_special = "/@\" "
}
#----------------------------------------------------------------------------------------------
resource "random_string" "vault_password" {
   length           = 40
   min_upper        = 10
   min_lower        = 10
   min_numeric      = 10
   min_special      = 10
   special          = true
   override_special = "/@\" "
}
#----------------------------------------------------------------------------------------------
data "azurerm_client_config" "current" {
}
#----------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "${local.default_name}-rg"
  location = "East US 2"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#----------------------------------------------------------------------------------------------
resource "azurerm_storage_account" "storage" {
  name                     = "inecsoftstorage"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS" #LRS, GRS, RAGRS and ZRS.
  account_kind             = "StorageV2" 

#  network_rules {
#    default_action             = "Deny"
#    ip_rules                   = ["100.0.0.1"]
#    virtual_network_subnet_ids = [azurerm_subnet.sub-net-database.id]
#  }
  blob_properties {
   delete_retention_policy {
     days = 7
   }
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#----------------------------------------------------------------------------------------------
resource "azurerm_sql_server" "mssql" {
  name                         = "${local.default_name}-sql"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = random_string.vault_user.result
  administrator_login_password = random_string.vault_password.result

  tags = {
    Env = "${terraform.workspace}"
  }
}
#----------------------------------------------------------------------------------------------
resource "azurerm_sql_active_directory_administrator" "mssql" {
  server_name         = azurerm_sql_server.mssql.name
  resource_group_name = azurerm_resource_group.rg.name
  login               = "sqladmin"
  tenant_id = data.azurerm_client_config.current.tenant_id
  object_id = data.azurerm_client_config.current.object_id
}
#----------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg-app" {
  name     = "${local.default_name}-rg-app"
  location = "East US 2"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#----------------------------------------------------------------------------------------------
resource "azurerm_app_service_plan" "app-service-plan" {
    name                = "${local.default_name}-AppServicePlan"
    location            = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
    #kind                = "Linux"
    kind                = "FunctionApp"
    reserved            = true

    sku {
        tier = "Standard"
        size = "S1"
    }
    
    tags = {
      Env =  "${terraform.workspace}"
    }
}
#----------------------------------------------------------------------------------------------
resource "azurerm_function_app" "functionswrite" {
  name                      = "${local.default_name}-function-app-write"
  location                  = azurerm_resource_group.rg-app.location
  resource_group_name       = azurerm_resource_group.rg-app.name
  app_service_plan_id       = azurerm_app_service_plan.app-service-plan.id

  storage_account_name       = azurerm_storage_account.storage.name
  storage_account_access_key = azurerm_storage_account.storage.primary_access_key

  version                   = "~2"
  https_only                = "true"
 
  app_settings = {
    APPINSIGHTS_INSTRUMENTATIONKEY = azurerm_application_insights.app-insights.instrumentation_key
  }
 
  identity {
    type = "SystemAssigned"
  }
}
#----------------------------------------------------------------------------------------------
output "app_hostname" {
   value = azurerm_function_app.functionswrite.default_hostname
}
#----------------------------------------------------------------------------------------------
resource "azurerm_application_insights" "app-insights" {
  name                = "${local.default_name}-app-insights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
  
  sampling_percentage                   = 0
  daily_data_cap_in_gb                  = 100
  daily_data_cap_notifications_disabled = false
  disable_ip_masking                    = false

  tags = {
    Env = "${terraform.workspace}"
  }
}
#----------------------------------------------------------------------------------------------
resource "azurerm_key_vault" "keyvault" {
  name                = "InecsoftKeyvault" 
  location            = azurerm_resource_group.rg-app.location
  resource_group_name = azurerm_resource_group.rg-app.name
  tenant_id           = data.azurerm_client_config.current.tenant_id

  #specify whether Azure Virtual Machines are permitted to retrieve certificates stored as secrets from the key vault
  enabled_for_deployment          = true
  #specify whether Azure Disk Encryption is permitted to retrieve secrets from the vault and unwrap keys
  enabled_for_disk_encryption     = true
  #specify whether Azure Resource Manager is permitted to retrieve secrets from the key vault
  enabled_for_template_deployment = true

  #sku_name = "premium"
  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "create",
      "get",
    ]

    secret_permissions = [
      "set",
      "get",
      "delete",
    ]
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#----------------------------------------------------------------------------------------------
#resource "azurerm_key_vault_access_policy" "keyvaultpolicymsifunctionswrite" {
#  key_vault_id   = azurerm_key_vault.keyvault.id
#  tenant_id      = azurerm_function_app.functionswrite.identity.0.tenant_id
#  object_id      = azurerm_function_app.functionswrite.identity.0.principal_id
# 
#  secret_permissions = [
#    "set", 
#    "list",
#  ]
# 
#  depends_on = [ azurerm_function_app.functionswrite ]
#}
#
#----------------------------------------------------------------------------------------------


