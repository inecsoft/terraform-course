#--------------------------------------------------------------------------------------------
resource "azurerm_storage_account" "storage" {
  name                     = "${terraform.workspace}storage"
  location                 = azurerm_resource_group.core.location
  resource_group_name      = azurerm_resource_group.core.name
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
    Name = "${local.default_name}-storage"
  }
}
#--------------------------------------------------------------------------------------------