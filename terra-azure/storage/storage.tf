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

resource "azurerm_storage_container" "storage_container" {
  name                  = "state"
  storage_account_name  = azurerm_storage_account.main.name
  container_access_type = "private"
}

# az storage account show-connection-string -g devstorageaccountname -n state

resource "azurerm_storage_blob" "storage_blob" {
  name                   = "my-awesome-content.zip"
  storage_account_name   = azurerm_storage_account.main.name
  storage_container_name = azurerm_storage_container.main.name
  type                   = "Block"
  source                 = "some-local-file.zip"
}