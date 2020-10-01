#---------------------------------------------------------------------------
output "tenant_id" {
  description = "description tenant_id"
  value       = data.azurerm_client_config.current.tenant_id
}
#---------------------------------------------------------------------------
output "object_id" {
  description = "description object_id"
  value       = data.azurerm_client_config.current.object_id
}
#---------------------------------------------------------------------------
