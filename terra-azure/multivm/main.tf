resource "azurerm_resource_group" "main" {
  name     = "${terraform.workspace}-TF-Azure-CDS-DevOps"
  location = "uksouth"
}

data "azurerm_client_config" "current" {}

resource "random_id" "randomId" {
  keepers = {
    resource_group = azurerm_resource_group.main.name
  }

  byte_length = 8
}

resource "azurerm_storage_account" "storage_account" {
  name                     = "${terraform.workspace}storageaccountname" #"diag${random_id.randomId.hex}"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

  tags = var.project_tags
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


###########################################-Networking-########################################################
resource "azurerm_virtual_network" "main" {
  name                = "devops-vm-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  tags = var.project_tags
}

resource "azurerm_subnet" "main" {
  name                 = "${azurerm_resource_group.main.name}-Subnet"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefixes     = ["10.0.1.0/24"]
}

resource "azurerm_public_ip" "main" {
  count = length(var.win-service)

  name                = "${var.win-service[count.index]}-devops-vm-public-ip"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  allocation_method   = "Static"

  tags = var.project_tags
}

resource "azurerm_network_interface" "main" {
  count = length(var.win-service)

  name                = "${var.win-service[count.index]}-devops-vm-nic"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  ip_configuration {
    name                          = "devops-vm-public"
    subnet_id                     = azurerm_subnet.main.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.main[count.index].id
  }

  tags = var.project_tags
}

# Connect the security group to the network interface
resource "azurerm_network_interface_security_group_association" "main" {
  count = length(var.win-service)

  network_interface_id      = azurerm_network_interface.main[count.index].id
  network_security_group_id = azurerm_network_security_group.main-wind.id
}
###########################################-Networking-end-########################################################

###########################################-VMS-###################################################################
# Iterate over "devops_users" list in variables.tf
/* resource "azurerm_linux_virtual_machine" "main" {
  count               = length(var.devops_users)

  name                = "${var.devops_users[count.index]}-devops-vm"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = var.vm_size
  admin_username      = var.devops_users[count.index]
  disable_password_authentication = true
  tags = var.project_tags

  network_interface_ids = [
    azurerm_network_interface.main[count.index].id
  ]

  admin_ssh_key {
    username   = var.devops_users[count.index]
    public_key = file("./authorized_keys/${var.devops_users[count.index]}.pub")
  }

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
    disk_size_gb         = 128
  }

  source_image_id = data.azurerm_image.packer-image.id

  boot_diagnostics {
    storage_account_uri = azurerm_storage_account.vm_boot_diag.primary_blob_endpoint
  }
} */
###############################################
data "azurerm_image" "packer-image-wind" {
  name                = "DevOps_windows_VM"
  resource_group_name = "TF-Azure-CDS-DevOps"
}

output "packer-image-wind-id" {
  value       = data.azurerm_image.packer-image-wind.id
  description = "retrieve image id"
}

resource "azurerm_windows_virtual_machine" "win-service" {
  count = length(var.win-service)
  name  = "${var.win-service[count.index]}-${count.index}"

  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = var.vm_size
  admin_username      = var.devops_users[count.index]
  admin_password      = random_password.password.result
  /* disable_password_authentication = true */
  /* custom_data =  */
  source_image_id = data.azurerm_image.packer-image-wind.id

  network_interface_ids = [
    azurerm_network_interface.main[count.index].id
  ]

  # to spin and example this conflits with source_image_id
  /* source_image_reference {
    publisher = "MicrosoftWindowsServer"
    offer     = "WindowsServer"
    sku       = "2016-Datacenter"
    version   = "latest"
  } */

  os_disk {
    name                 = var.win-service[count.index]
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  tags = var.project_tags
}

output "windows-server-addresses" {
  value = [azurerm_windows_virtual_machine.win-service.*.public_ip_address]
}
###########################################-VMS-end-###################################################################

###########################################-Outputs-################################
output "windows-server-pass" {
  value       = random_password.password.result
  sensitive   = true
  description = "password of the windows server sensitive If you do intend to export this data, annotate the output value as sensitive by adding the following argument"
}

output "STORAGE_ACCOUNT_NAME" {
  description = "this storage account name for the backend"
  value       = azurerm_storage_account.vm_boot_diag.name
}

