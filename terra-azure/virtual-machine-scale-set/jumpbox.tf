#----------------------------------------------------------------------------------------------------
#This optional step enables SSH access to the instances of the virtual machine scale set by using a jumpbox.

#Add the following resources to your existing deployment:

# * A network interface connected to the same subnet as the virtual machine scale set
# * A virtual machine with this network interface
#----------------------------------------------------------------------------------------------------
resource "azurerm_public_ip" "jumpbox" {
  name                = "${local.default_name}-jumpbox-public-ip"
  location            = var.location
  resource_group_name = azurerm_resource_group.vmss.name
  allocation_method   = "Static"
  domain_name_label   = "${azurerm_resource_group.vmss.name}-ssh"

  tags = {
    environment = "codelab"
  }
}

resource "azurerm_network_interface" "jumpbox" {
  name                = "${local.default_name}-jumpbox-nic"
  location            = var.location
  resource_group_name = azurerm_resource_group.vmss.name

  ip_configuration {
    name                          = "${local.default_name}-IPConfiguration"
    subnet_id                     = azurerm_subnet.vmss.id
    private_ip_address_allocation = "dynamic"
    public_ip_address_id          = azurerm_public_ip.jumpbox.id
  }

  tags = {
    environment = "codelab"
  }
}

resource "azurerm_virtual_machine" "jumpbox" {
  name                  = "${local.default_name}-jumpbox"
  location              = var.location
  resource_group_name   = azurerm_resource_group.vmss.name
  network_interface_ids = [azurerm_network_interface.jumpbox.id]
  vm_size               = "Standard_D2_v3"

  storage_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  storage_os_disk {
    name              = "${local.default_name}-jumpbox-osdisk"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }

  os_profile {
    computer_name  = "jumpbox"
    admin_username = "azureuser"
    admin_password = "Password1234!"
  }

  os_profile_linux_config {
    disable_password_authentication = true

    ssh_keys {
      path     = "/home/azureuser/.ssh/authorized_keys"
      key_data = file("~/.ssh/id_rsa.pub")
    }
  }

  tags = {
    environment = "codelab"
  }
}
#----------------------------------------------------------------------------------------------------
