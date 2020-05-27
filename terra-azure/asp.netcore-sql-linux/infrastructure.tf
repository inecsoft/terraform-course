#--------------------------------------------------------------------------------------------
#Create resource group
#--------------------------------------------------------------------------------------------
#check all supported locations for App Service on Linux in Basic tier
#az appservice list-locations --sku B1 --linux-workers-enabled
#--------------------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
    name = "${local.default_name}-RG"
    location = "East US 2"
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_server" "sql-server-1" {
  name                         = "${local.default_name}-sqlserver-1"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = "4dm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"


  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_server" "sql-server-2" {
  name                         = "${local.default_name}-sqlserver-2"
  resource_group_name          = azurerm_resource_group.rg.name
  #location                     = azurerm_resource_group.rg.location
  location                     = "West US 2"
  version                      = "12.0"
  administrator_login          = var.admin-user
  administrator_login_password = var.admin-pass

  tags = {
    Env = "${terraform.workspace}"
  }
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
#Create a database
#az sql db create --resource-group myResourceGroup --server <server-name> --name coreDB --service-objective S0
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_database" "sql-db" {
  name                = "${local.default_name}-sql-db"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  server_name         = azurerm_sql_server.sql-server-1.name

  requested_service_objective_name = "S0"

  extended_auditing_policy {
    storage_endpoint                        = azurerm_storage_account.storage.primary_blob_endpoint
    storage_account_access_key              = azurerm_storage_account.storage.primary_access_key
    storage_account_access_key_is_secondary = true
    retention_in_days                       = 6
  }

  threat_detection_policy {
    state            = "Enabled"
    retention_days   = 30
    email_addresses  = ["ivanpedrouk@gmail.com" ]
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_failover_group" "sql-fail-gp" {
  name                = "${local.default_name}-failover-gp"
  resource_group_name = azurerm_sql_server.sql-server-1.resource_group_name
  server_name         = azurerm_sql_server.sql-server-1.name
  databases           = [azurerm_sql_database.sql-db.id]
  partner_servers {
    id = azurerm_sql_server.sql-server-2.id
  }

  read_write_endpoint_failover_policy {
    mode          = "Automatic"
    grace_minutes = 60
  }
}
#--------------------------------------------------------------------------------------------
#In order to make the firewall more secure allow traffic only from the app
#Azure CLI
#az webapp show --resource-group <group_name> --name <app_name> --query outboundIpAddresses --output tsv
#Azure PowerShell
#(Get-AzWebApp -ResourceGroup <group_name> -name <app_name>).OutboundIpAddresses
#possible_outbound_ip_addresses is a list of ip addresses
#outbound_ip_addresses is a list of ip addresses
#azurerm_app_service.name.outbound_ip_addresses
#start_ip_address = element(sort(zurerm_app_service.app-service.outbound_ip_addresses),0)
#end_ip_address   = element(reverse(sort(azurerm_app_service.app-service.outbound_ip_addresses)),0)
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_firewall_rule" "fw-app" {
  count               = 2
  name                = "${local.default_name}-Allow-App-Ips-${count.index+1}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = element([azurerm_sql_server.sql-server-1.name, azurerm_sql_server.sql-server-2.name],count.index)

  #start_ip_address    = "0.0.0.0"
  #end_ip_address    = "0.0.0.0"

  start_ip_address    = element(sort(zurerm_app_service.app-service.outbound_ip_addresses),0)
  end_ip_address      = element(reverse(sort(azurerm_app_service.app-service.outbound_ip_addresses)),0)
  
}
#--------------------------------------------------------------------------------------------
resource "azurerm_sql_firewall_rule" "fw-client" {
  count               = 2
  name                = "${local.default_name}-AllowLocalClient-${count.index+1}"
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = element([azurerm_sql_server.sql-server-1.name, azurerm_sql_server.sql-server-2.name],count.index)
  start_ip_address    = chomp(data.http.workstation-external-ip.body)
  end_ip_address      = chomp(data.http.workstation-external-ip.body)
}
#--------------------------------------------------------------------------------------------
#resource "null_resource" "ip-fw" {
#
#  provisioner "local-exec" {
#    command = "az webapp show --resource-group <group_name> --name <app_name> --query outboundIpAddresses --output tsv >> private_ips.txt"
#  }
#
#}
#--------------------------------------------------------------------------------------------
resource "null_resource" "conection-string" {

  provisioner "local-exec" {
    command = [
              "cd dotnetcore-sqldb-tutorial",
              "echo #Delete old migrations",
              "rm Migrations -r",
              "echo #Recreate migrations",
              "dotnet ef migrations add InitialCreate",
              "export ConnectionStrings__MyDbConnection="Server=tcp:${azurerm_sql_server.sql-server-1.fully_qualified_domain_name},1433;Database=${azurerm_sql_database.sql-db.name};User ID=${azurerm_sql_server.sql-server-1.administrator_login};Password=${azurerm_sql_server.sql-server-1.administrator_login_password};Encrypt=true;Connection Timeout=30;"",
              "echo #Run migrations",
              "dotnet ef database update"     
               ]

  }

}
#--------------------------------------------------------------------------------------------
#Create connection string
#az sql db show-connection-string --client ado.net --server cephalin-core --name coreDB
#In the command output, replace <username>, and <password> with the database administrator credentials you used earlier
#az sql db show-connection-string --client ado.net --server prod-inecsoft-sqlserver-1 --name prod-inecsoft-sql-db
#"Server=tcp:prod-inecsoft-sqlserver-1.database.windows.net,1433;Database=prod-inecsoft-sql-db;User ID=<username>;Password=<password>;Encrypt=true;Connection Timeout=30;"
#az sql db show-connection-string --client ado.net --server prod-inecsoft-sqlserver-2 --name prod-inecsoft-sql-db
#"Server=tcp:prod-inecsoft-sqlserver-2.database.windows.net,1433;Database=prod-inecsoft-sql-db;User ID=<username>;Password=<password>;Encrypt=true;Connection Timeout=30;"
#how to script it
#"Server=tcp:${azurerm_sql_server.sql-server-1.fully_qualified_domain_name},1433;Database=${azurerm_sql_database.sql-db.name};User ID=${azurerm_sql_server.sql-server-1.administrator_login};Password=${azurerm_sql_server.sql-server-1.administrator_login_password};Encrypt=true;Connection Timeout=30;"
#"Server=tcp:${azurerm_sql_server.sql-server-2.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_sql_database.db.name};Persist Security Info=False;User ID=${azurerm_sql_server.sql-server-2.administrator_login};Password=${azurerm_sql_server.sql-server-2.administrator_login_password};MultipleActiveResult Sets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
#Configure app to connect to production database
# vim dotnetcore-sqldb-tutorial/Startup.cs and replace the code with the following
#services.AddDbContext<MyDatabaseContext>(options =>
#        options.UseSqlServer(Configuration.GetConnectionString("MyDbConnection")));

#--------------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------------
resource "azurerm_app_service_plan" "app-service-plan" {
    name                = "${local.default_name}-AppServicePlan"
    location            = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
    kind                = "Linux"
    reserved            = true

    sku {
        tier = "Standard"
        size = "S1"
    }
    
    tags = {
      Env =  "${terraform.workspace}"
    }
}
#--------------------------------------------------------------------------------------------
resource "azurerm_app_service" "app-service" {
    name                = "${local.default_name}-AppService"
    location            = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
    app_service_plan_id = azurerm_app_service_plan.app-service-plan.id

    #linux_fx_version = DOCKER|<user/image:tag>)
    #linux_fx_version = "COMPOSE|${filebase64("docker-compose.yml")}"
    #site_config {
    #  app_command_line = ""
    #  linux_fx_version = "DOCKER|appsvcsample/python-helloworld:latest"
    #}

    #app_settings = {
    #  "WEBSITES_ENABLE_APP_SERVICE_STORAGE" = "false"
    #  "DOCKER_REGISTRY_SERVER_URL"          = "https://${azurerm_container_registry.acr.login_server}"
    #}

    site_config {
      scm_type                 = "LocalGit"
    }

    connection_string {
       name  = "${local.default_name}-Database"
       type  = "SQLServer"
       value = "Server=${azurerm_sql_server.sql-server-1.fully_qualified_domain_name},1433;Database=${azurerm_sql_database.sql-db.name};User ID=${azurerm_sql_server.sql-server-1.administrator_login};Password=${azurerm_sql_server.sql-server-1.administrator_login_password};Encrypt=true;Connection Timeout=30;"

    }

    tags = {
      Env =  "${terraform.workspace}"
    }
}
#--------------------------------------------------------------------------------------------
#az webapp config connection-string set --resource-group myResourceGroup --name <app-name> --settings MyDbConnection="<connection-string>" --connection-string-type SQLAzure

