#---------------------------------------------------------------------------------------------
output "Resource-Group-name" {
  value = azurerm_resource_group.rg.name
}
#---------------------------------------------------------------------------------------------
output "sql_server_fqdn-1" {
  description = "Fully Qualified Domain Name (FQDN) of the Azure SQL Database created."
  value = azurerm_sql_server.sql-server-1.fully_qualified_domain_name
}
#---------------------------------------------------------------------------------------------
output "sql_server_fqdn-2" {
  description = "Fully Qualified Domain Name (FQDN) of the Azure SQL Database created."
  value = azurerm_sql_server.sql-server-2.fully_qualified_domain_name
}
#---------------------------------------------------------------------------------------------
output "database_name" {
  description = "Database name of the Azure SQL Database created."
  value = "${azurerm_sql_database.sql-db.name}"
}
#---------------------------------------------------------------------------------------------
output "sql_server_name-1" {
  description = "Server name of the Azure SQL Database created."
  value       = "${azurerm_sql_server.sql-server-1.name}"
}
#---------------------------------------------------------------------------------------------
output "sql_server_location-1" {
  description = "Location of the Azure SQL Database created."
  value       = "${azurerm_sql_server.sql-server-1.location}"
}
#---------------------------------------------------------------------------------------------
output "sql_server_location-2" {
  description = "Location of the Azure SQL Database created."
  value       = "${azurerm_sql_server.sql-server-2.location}"
#---------------------------------------------------------------------------------------------
output "sql_server_version" {
  description = "Version the Azure SQL Database created."
  value       = "${azurerm_sql_server.sql-server-1.version}"
}
#---------------------------------------------------------------------------------------------
output "connection_string-1" {
  description = "Connection string for the Azure SQL Database created."
  value       = "Server=tcp:${azurerm_sql_server.sql-server-1.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_sql_database.db.name};Persist Security Info=False;User ID=${azurerm_sql_server.sql-server-1.administrator_login};Password=${azurerm_sql_server.sql-server-1.administrator_login_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
}
#---------------------------------------------------------------------------------------------
output "connection_string-2" {
  description = "Connection string for the Azure SQL Database created."
  value       = "Server=tcp:${azurerm_sql_server.sql-server-2.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_sql_database.db.name};Persist Security Info=False;User ID=${azurerm_sql_server.sql-server-2.administrator_login};Password=${azurerm_sql_server.sql-server-2.administrator_login_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
}
#---------------------------------------------------------------------------------------------
output "app_service_default_hostname" {
  value = "https://${azurerm_app_service.app-service-plan.default_site_hostname}"
}
#---------------------------------------------------------------------------------------------
