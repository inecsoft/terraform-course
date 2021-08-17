#-----------------------------------------------------------------------------------
resource "azurerm_resource_group" "main" {
  name     = "${local.default_name}-resources"
  location = var.location
}
#-----------------------------------------------------------------------------------
resource "azurerm_virtual_network" "main" {
  name                = "${local.default_name}-network"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
}
#-----------------------------------------------------------------------------------
resource "azurerm_subnet" "internal" {
  name                 = "${local.default_name}-sub-net"
  resource_group_name  = azurerm_resource_group.main.name
  virtual_network_name = azurerm_virtual_network.main.name
  address_prefix       = "10.0.2.0/24"
}
#-----------------------------------------------------------------------------------
resource "azurerm_public_ip" "pip" {
  name                = "${local.default_name}-pip"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  allocation_method   = "Dynamic"
}
#-----------------------------------------------------------------------------------
resource "azurerm_network_interface" "main" {
  count               = local.instance_count
  name                = "${local.default_name}-nic${count.index}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  ip_configuration {
    name                          = "${local.default_name}-primary"
    subnet_id                     = azurerm_subnet.internal.id
    private_ip_address_allocation = "Dynamic"
  }
}
#-----------------------------------------------------------------------------------
resource "azurerm_availability_set" "avset" {
  name                         = "${local.default_name}-avset"
  location                     = azurerm_resource_group.main.location
  resource_group_name          = azurerm_resource_group.main.name
  platform_fault_domain_count  = 2
  platform_update_domain_count = 2
  managed                      = true
}
#-----------------------------------------------------------------------------------
resource "azurerm_network_security_group" "webserver-sg" {
  name                = "${local.default_name}-tls_webserver"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  security_rule {
    access                     = "Allow"
    direction                  = "Inbound"
    name                       = "tls"
    priority                   = 100
    protocol                   = "Tcp"
    source_port_range          = "*"
    source_address_prefix      = "*"
    destination_port_range     = "443"
    destination_address_prefix = azurerm_subnet.internal.address_prefix
  }
}
#-----------------------------------------------------------------------------------
resource "azurerm_lb" "lb" {
  name                = "${local.default_name}-lb"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name

  frontend_ip_configuration {
    name                 = "${local.default_name}-PublicIPAddress"
    public_ip_address_id = azurerm_public_ip.pip.id
  }
}
#-----------------------------------------------------------------------------------
resource "azurerm_lb_backend_address_pool" "pool" {
  name                = "${local.default_name}-BackEndAddressPool"
  resource_group_name = azurerm_resource_group.main.name
  loadbalancer_id     = azurerm_lb.lb.id
}
#-----------------------------------------------------------------------------------
resource "azurerm_lb_nat_rule" "nat" {
  resource_group_name            = azurerm_resource_group.main.name
  loadbalancer_id                = azurerm_lb.lb.id
  name                           = "HTTPSAccess"
  protocol                       = "Tcp"
  frontend_port                  = 443
  backend_port                   = 443
  frontend_ip_configuration_name = azurerm_lb.lb.frontend_ip_configuration[0].name
}
#-----------------------------------------------------------------------------------
resource "azurerm_network_interface_backend_address_pool_association" "pool-association" {
  count                   = local.instance_count
  backend_address_pool_id = azurerm_lb_backend_address_pool.pool.id
  ip_configuration_name   = "${local.default_name}-primary"
  network_interface_id    = element(azurerm_network_interface.main.*.id, count.index)
}
#-----------------------------------------------------------------------------------
resource "azurerm_linux_virtual_machine" "main" {
  count               = local.instance_count
  name                = "${local.default_name}-vm${count.index}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  size                = "Standard_D2_v3"
  admin_username      = "adminuser"

  availability_set_id             = azurerm_availability_set.avset.id
  disable_password_authentication = true

  network_interface_ids = [
    azurerm_network_interface.main[count.index].id,
  ]

  admin_ssh_key {
    username   = "adminuser"
    public_key = file("autoscaler.pub")
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "UbuntuServer"
    sku       = "18.04-LTS"
    version   = "latest"
  }

  os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }
}
#-----------------------------------------------------------------------------------

