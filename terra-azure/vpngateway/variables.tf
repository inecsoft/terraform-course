#------------------------------------------------------------------------------------------
variable "loc" {
    description = "Default Azure region"
    default     =   "West Europe"
}
#------------------------------------------------------------------------------------------
#------------------------------------------------------------------------------------------
variable "tenant_id" {
    # az ad sp show --id "http://terraformKeyVaultReader" --output tsv --query appOwnerTenantId
    description = "GUID for the Azure AD tenancy or directory. "
    default     = "<tenant_id>"
}
#------------------------------------------------------------------------------------------
variable "object_id" {
    # az ad sp show --id "http://terraformKeyVaultReader" --output tsv --query objectId}
    description = "Object ID for the terraformKeyVaultReader service principal"
    default     = "4e12ff32-c439-49aa-adaf-026ff6366576"
}

#------------------------------------------------------------------------------------------
#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "vpn"))}"
}
#-------------------------------------------------------------------
data "azurerm_client_config" "current" {}

#tenant_id = data.azurerm_client_config.current.tenant_id
#object_id = data.azurerm_client_config.current.object_id
#-------------------------------------------------------------------
