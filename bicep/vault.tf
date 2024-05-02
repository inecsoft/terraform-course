resource "random_string" "vault_password" {
  length           = 40
  min_upper        = 10
  min_lower        = 10
  min_numeric      = 10
  min_special      = 10
  special          = true
  override_special = "/@\" "
}

data "azurerm_client_config" "current" {
}

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