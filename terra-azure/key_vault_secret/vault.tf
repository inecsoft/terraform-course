resource "azurerm_resource_group" "main" {
  name     = "${terraform.workspace}-TF-Azure-CDS-DevOps"
  location = "uksouth"
}

data "azurerm_client_config" "current" {}

resource "azurerm_storage_account" "storage_account" {
  name                     = "${terraform.workspace}storageaccountname"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"
}

resource "azurerm_key_vault" "key_vault" {
  name                       = "${terraform.workspace}-keyvault"
  location                   = azurerm_resource_group.main.location
  resource_group_name        = azurerm_resource_group.main.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "premium"
  soft_delete_retention_days = 7

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Create",
      "Get",
    ]

    secret_permissions = [
      "Set",
      "Get",
      "Delete",
      "Purge",
      "Recover"
    ]
  }
}

#echo random_password.password.result | terraform console
resource "azurerm_key_vault_secret" "key_vault_secret" {
  name         = "${terraform.workspace}-secret-sauce"
  value        = random_password.password.result
  key_vault_id = azurerm_key_vault.key_vault.id
}

resource "azurerm_monitor_diagnostic_setting" "monitor_diagnostic_setting" {
  name               = "${terraform.workspace}-monitor-vault"
  target_resource_id = azurerm_key_vault.main.id
  storage_account_id = azurerm_storage_account.main.id

  enabled_log {
    category = "AuditEvent"

    retention_policy {
      enabled = false
    }
  }

  metric {
    category = "AllMetrics"

    retention_policy {
      enabled = false
    }
  }
}