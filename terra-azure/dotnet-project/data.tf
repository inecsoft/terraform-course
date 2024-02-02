#--------------------------------------------------------------------
#Generate Random String
#--------------------------------------------------------------------
resource "random_string" "vault_password" {
   length      = 40
   min_upper   = 10
   min_lower   = 10
   min_numeric = 10
   min_special = 10
   override_special = "/@\" "
}
#--------------------------------------------------------------------
resource "random_string" "vault_user" {
   length      = 16
   min_upper   = 4
   min_lower   = 4
   min_numeric = 4
   min_special = 4
   override_special = "/@\" "
}
#--------------------------------------------------------------------
resource "random_uuid" "vault-uuid" {}
#--------------------------------------------------------------------
output "vault-uuid" {
  value = random_uuid.vault-uuid.result
}
#--------------------------------------------------------------------
output "vault_password" {
  value = "${azure_key_vault_secret.vm_secret.value}"
}
#--------------------------------------------------------------------
data "azurerm_client_config" "current" {
}
#--------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "${local.default_name}"
  location = "West US"
}
#--------------------------------------------------------------------
resource "azure_key_vault_secret" "vm_secret" {
  name      = "${local.default_name}-secrect"
  value     = "${random_string.vault_password}"
  vault_uri = "${https://${local.default_name}-secret-keyvault.vault.azure.net/}"
 # key_vault_id = azurerm_key_vault.example.id

  tags      = {
    Env     = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------
