#--------------------------------------------------------------------------------------------
#Build in Azure with ACR Tasks
#--------------------------------------------------------------------------------------------
#Create resource group
#--------------------------------------------------------------------------------------------
#check all supported locations for App Service on Linux in Basic tier
#az appservice list-locations --sku B1 --linux-workers-enabled
#--------------------------------------------------------------------------------------------
#az group create --resource-group prod-inecsoft-RG --location eastusw
#az acr create --resource-group prod-inecsoft-RG --name  inesoftnodejsapp --sku Standard --location eastus2
#--------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
    name = "${local.default_name}-RG"
    location = "East US 2"
}
#--------------------------------------------------------------------------------------------
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
#--------------------------------------------------------------------------------------------
#az storage container create --name terraform --account-name inecsoftstorage
#--------------------------------------------------------------------------------------------
resource "azure_storage_container" "stor-cont" {
  name                  = "${local.default_name}-terraform-storage-container"
  container_access_type = "container"
  storage_service_name  = azurerm_storage_account.storage.name
}
#--------------------------------------------------------------------------------------------
resource "azurerm_container_registry" "acr" {
  name                      = var.ACR_NAME
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = azurerm_resource_group.rg.location
  sku                       = "Standard"    #Basic, Standard, Premium
  admin_enabled             = false
  #georeplication_locations = ["East US", "West Europe"] #if Premium

  tags = {
     Env = "${terraform.workspace}"
  }
}
output "login_server" {
  value = data.azurerm_container_registry.acr.login_server
}
#--------------------------------------------------------------------------------------------
resource "null_resource" "docker-build" {

 provisioner "local-exec" {
    command =  "cd acr-build-helloworld-node ; az acr build --registry ${var.ACR_NAME} --image helloacrtasks:v1 ."
  }

}
#--------------------------------------------------------------------------------------------
#Deploy to Azure Container Instances
#--------------------------------------------------------------------------------------------
#You will create an Azure Key Vault and service principal,
#then deploy the container to Azure Container Instances (ACI) using the service principal's credentials
#--------------------------------------------------------------------------------------------
#1- Create a key vault
#az keyvault create --resource-group $RES_GROUP --name $AKV_NAME
#--------------------------------------------------------------------------------------------
data "azurerm_client_config" "current" {}
#--------------------------------------------------------------------------------------------
resource "azurerm_key_vault" "key-vault" {
  name                        = "${local.default_name}-key-vault"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name

  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_enabled         = true
  purge_protection_enabled    = false

  enabled_for_deployment          = false
  enabled_for_disk_encryption     = false
  enabled_for_template_deployment = false


  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    certificate_permissions = [
      "get",
      "list",
      "delete",
      "create",
      "import",
      "update",
      "managecontacts",
      "getissuers",
      "listissuers",
      "setissuers",
      "deleteissuers",
      "manageissuers",
      "recover",
    ]

    key_permissions = [
      "get",
      "create",
      "delete",
      "list",
      "update",
      "import",
      "backup",
      "restore",
      "recover",
    ]

    secret_permissions = [
      "get",
      "list",
      "set",
      "delete",
      "backup",
      "restore",
      "recover",
    ]

    storage_permissions = [
      "get",
      "list",
      "delete",
      "set",
      "update",
      "regeneratekey",
      "setsas",
      "listsas",
      "getsas",
      "deletesas"
    ]
  }

  network_acls {
    default_action = "Allow"
    bypass         = "AzureServices"
    ip_rules                   = []
    virtual_network_subnet_ids = []
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
# Create service principal, store its password in AKV (the registry *password*)
#az keyvault secret set \
#  --vault-name prod-inecsoft-key-vault \
#  --name  prod-inecsoft-key-vault-secret \
#  --value $(az ad sp create-for-rbac \
#                --name inesoftnodejsapppull \
#                --scopes $(az acr show --name inesoftnodejsapp --query id --output tsv) \
#                --role acrpull \
#                --query password \
#                --output tsv)
#
#az ad sp show --id http://inesoftnodejsapp --query appId --output tsv
#https://docs.microsoft.com/bs-latn-ba/azure/container-registry/container-registry-auth-service-principal
#--------------------------------------------------------------------------------------------
resource "azurerm_key_vault_secret" "key-vault-secret" {
  name         = "${local.default_name}-secret-sauce"
  value        = "szechuan"
  key_vault_id = azurerm_key_vault.key-vault.id

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------

