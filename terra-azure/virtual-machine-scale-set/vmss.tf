#---------------------------------------------------------------------------------
#Define the network infrastructure:

#  * One virtual network with the address space of 10.0.0.0/16.
#  * One subnet with the address space of 10.0.2.0/24.
#  * Two public IP addresses. One is used by the virtual machine scale set load balancer. The other is used to connect to the SSH jumpbox.
#---------------------------------------------------------------------------------
resource "azurerm_resource_group" "vmss" {
  name     = "${local.default_name}-${var.resource_group_name}"
  location = var.location

  tags =  {
    environment = "codelab"
  }
}
#---------------------------------------------------------------------------------
resource "azurerm_virtual_network" "vmss" {
  name                = "${local.default_name}-vmss-vnet"
  address_space       = ["10.0.0.0/16"]
  location            = var.location
  resource_group_name = azurerm_resource_group.vmss.name

  tags =  {
    environment = "codelab"
  }
}
#---------------------------------------------------------------------------------
resource "azurerm_subnet" "vmss" {
  name                 = "${local.default_name}-vmss-subnet"
  resource_group_name  = azurerm_resource_group.vmss.name
  virtual_network_name = azurerm_virtual_network.vmss.name
  address_prefix       = "10.0.2.0/24"
}
#---------------------------------------------------------------------------------
resource "azurerm_public_ip" "vmss" {
  name                         = "${local.default_name}-vmss-public-ip"
  location                     = var.location
  resource_group_name          = azurerm_resource_group.vmss.name
  allocation_method            = "Static"
  domain_name_label            = azurerm_resource_group.vmss.name

  tags =  {
    environment = "codelab"
  }
}
#---------------------------------------------------------------------------------
#Infrastructure to add the virtual machine scale set:

# * An Azure load balancer to serve the application. Attach it to the public IP address that was deployed earlier.
# * One Azure load balancer and rules to serve the application. Attach it to the public IP address that was configured earlier.
# * An Azure back-end address pool. Assign it to the load balancer.
# * A health probe port used by the application and configured on the load balancer.
# * A virtual machine scale set that sits behind the load balancer and runs on the virtual network that was deployed earlier.
# * Nginx on the nodes of the virtual machine scale installed from a custom image.
#---------------------------------------------------------------------------------
resource "azurerm_lb" "vmss" {
  name                = "${local.default_name}-vmss-lb"
  location            = var.location
  resource_group_name = azurerm_resource_group.vmss.name

  frontend_ip_configuration {
    name                 = "${local.default_name}-PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.vmss.id
  }

  tags = {
    environment = "codelab"
  }
}
#---------------------------------------------------------------------------------
resource "azurerm_lb_backend_address_pool" "bpepool" {
  resource_group_name = azurerm_resource_group.vmss.name
  loadbalancer_id     = azurerm_lb.vmss.id
  name                = "${local.default_name}-BackEndAddressPool"
}
#---------------------------------------------------------------------------------

resource "azurerm_lb_probe" "vmss" {
  resource_group_name = azurerm_resource_group.vmss.name
  loadbalancer_id     = azurerm_lb.vmss.id
  name                = "${local.default_name}-ssh-running-probe"
  port                = var.application_port
}
#---------------------------------------------------------------------------------
resource "azurerm_lb_rule" "lbnatrule" {
  resource_group_name            = azurerm_resource_group.vmss.name
  loadbalancer_id                = azurerm_lb.vmss.id
  name                           = "${local.default_name}-http"
  protocol                       = "Tcp"
  frontend_port                  = var.application_port
  backend_port                   = var.application_port
  backend_address_pool_id        = azurerm_lb_backend_address_pool.bpepool.id
  frontend_ip_configuration_name = "${local.default_name}-PublicIPAddress"
  probe_id                       = azurerm_lb_probe.vmss.id
}
#---------------------------------------------------------------------------------
data "azurerm_resource_group" "image" {
  depends_on = [azurerm_resource_group.image]
  name       = "${local.default_name}-ResourceGroup"
}
#---------------------------------------------------------------------------------
data "azurerm_image" "image" {
  depends_on          = [azurerm_resource_group.image]
  name                = "${local.default_name}-PackerImage"
  resource_group_name = data.azurerm_resource_group.image.name
}
#---------------------------------------------------------------------------------
resource "azurerm_virtual_machine_scale_set" "vmss" {
  name                = "${local.default_name}-vmscaleset"
  location            = var.location
  resource_group_name = azurerm_resource_group.vmss.name
  upgrade_policy_mode = "Manual"

  sku {
    #name     = "Standard_DS1_v2"
    name     = "Standard_D2_v3"
    tier     = "Standard"
    #capacity = 2
    capacity = 1
  }

  storage_profile_image_reference {
    id=data.azurerm_image.image.id
  }

  storage_profile_os_disk {
    name              = ""
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }

  storage_profile_data_disk {
    lun          = 0
    caching        = "ReadWrite"
    create_option  = "Empty"
    disk_size_gb   = 10
  }

  os_profile {
    computer_name_prefix = "vmlab"
    admin_username       = "azureuser"
    admin_password       = "Passwword1234"
  }

  os_profile_linux_config {
    disable_password_authentication = true

    ssh_keys {
      path     = "/home/azureuser/.ssh/authorized_keys"
      key_data = file("~/.ssh/id_rsa.pub")
    }
  }

  network_profile {
    name    = "${local.default_name}-terraformnetworkprofile"
    primary = true

    ip_configuration {
      name                                   = "${local.default_name}-IPConfiguration"
      subnet_id                              = azurerm_subnet.vmss.id
      load_balancer_backend_address_pool_ids = [azurerm_lb_backend_address_pool.bpepool.id]
      primary = true
    }
  }
  
  tags = {
    environment = "codelab"
  }
}
#---------------------------------------------------------------------------------

