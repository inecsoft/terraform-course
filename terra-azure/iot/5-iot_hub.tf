#-------------------------------------------------------------------
resource "azurerm_eventhub_namespace" "event-hub-namespace" {
  name                = "${local.default_name}-event-hub-namespace"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
}
#-------------------------------------------------------------------
resource "azurerm_eventhub" "event-hub" {
  name                = "${local.default_name}-eventhub"
  resource_group_name = azurerm_resource_group.rg.name
  namespace_name      = azurerm_eventhub_namespace.event-hub-namespace.name
  partition_count     = 2
  message_retention   = 1
}
#-------------------------------------------------------------------
resource "azurerm_eventhub_authorization_rule" "event-hub-auth-rule" {
  resource_group_name = azurerm_resource_group.rg.name
  namespace_name      = azurerm_eventhub_namespace.event-hub-namespace.name
  eventhub_name       = azurerm_eventhub.event-hub.name
  name                = "${local.default_name}-event-hub-auth-rule"
  send                = true
}
#-------------------------------------------------------------------
#https://www.terraform.io/docs/providers/azurerm/r/iothub.html
#-------------------------------------------------------------------
resource "azurerm_iothub" "iothub" {
  name                = "${local.default_name}-iothub"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  sku {
    # The name of the sku. Possible values are B1, B2, B3, F1, S1, S2, and S3
    name = "S1"
    # The number of provisioned IoT Hub units
    capacity = "1"
  }

  # endpoint {
  #   #The type of the endpoint. Possible values are AzureIotHub.StorageContainer, AzureIotHub.ServiceBusQueue, AzureIotHub.ServiceBusTopic or AzureIotHub.EventHub.
  #   type                       = "AzureIotHub.StorageContainer"
  #   connection_string          = azurerm_storage_account.storage-account.primary_blob_connection_string
  #   name                       = "${local.default_name}-iothub-SC"
  #   batch_frequency_in_seconds = 60
  #   max_chunk_size_in_bytes    = 10485760
  #   container_name             = azurerm_storage_container.example.name
  #   Supported values are 'avro' and 'avrodeflate
  #   encoding                   = "Avro"
  #   file_name_format           = "{iothub}/{partition}_{YYYY}_{MM}_{DD}_{HH}_{mm}"
  # }

  # route {
  #   name           = "export"
  #   source         = "DeviceMessages"
  #   condition      = "true"
  #   endpoint_names = ["export"]
  #   enabled        = true
  # }

  endpoint {
    type              = "AzureIotHub.EventHub"
    connection_string = azurerm_eventhub_authorization_rule.event-hub-auth-rule.primary_connection_string
    name              = "${local.default_name}-ioteventhub"
  }

  route {
    name           = "export2"
    source         = "DeviceMessages"
    condition      = "true"
    endpoint_names = ["${local.default_name}-ioteventhub"]
    enabled        = true
  }

  tags = {
    Name = "${local.default_name}-iothub"
  }
}
#-------------------------------------------------------------------
/* output "iothub-primary-key" {
  description = "The primary key."
  value       = azurerm_iothub.iothub.primary_key
}
#-------------------------------------------------------------------
output "iothub-key-name" {
  description = "The primary key."
  value       = azurerm_iothub.iothub.key_name
} */
#-------------------------------------------------------------------
