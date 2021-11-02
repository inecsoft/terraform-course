#---------------------------------------------------------------------------------
#get subscription id
#az account list --output table
#---------------------------------------------------------------------------------
resource "azurerm_resource_group" "rg" {
  name     = "${local.default_name}-netdevopsproject-rg"
  location = "East US 2"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#---------------------------------------------------------------------------------
resource "azurerm_resource_group" "vsts" {
  name     = "VstsRG-ivanpedro-6c3f"
  location = "eastus2"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#---------------------------------------------------------------------------------
resource "azurerm_storage_account" "storage" {
  name                     = "inecsoftstoragenet"
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
#---------------------------------------------------------------------------------
#terraform import azurerm_sql_server.example /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myresourcegroup/providers/Microsoft.Sql/servers/myserver
#---------------------------------------------------------------------------------
resource "azurerm_sql_server" "sql-server-1" {
  name                         = "${local.default_name}-sqlserver-1"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = "4dm1n157r470r"
  administrator_login_password = "4-v3ry-53cr37-p455w0rd"
  connection_policy            = "Default"

  tags = {
    Env = "${terraform.workspace}"
  }
}
#---------------------------------------------------------------------------------
#terraform import azurerm_sql_database.sql-db /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myresourcegroup/providers/Microsoft.Sql/servers/myserver/databases/database1
#---------------------------------------------------------------------------------
resource "azurerm_sql_database" "sql-db" {
  name                = "${local.default_name}-sql-db"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  server_name         = azurerm_sql_server.sql-server-1.name

  requested_service_objective_name = "S0"
  read_scale                       = false
  zone_redundant                   = false

  collation = "SQL_Latin1_General_CP1_CI_AS"
  extended_auditing_policy {
    storage_endpoint                        = azurerm_storage_account.storage.primary_blob_endpoint
    storage_account_access_key              = azurerm_storage_account.storage.primary_access_key
    storage_account_access_key_is_secondary = true
    retention_in_days                       = 6
  }

  threat_detection_policy {
    state           = "Enabled"
    retention_days  = 30
    email_addresses = ["ivanpedrouk@gmail.com"]
  }

  tags = {
    Env = "${terraform.workspace}"
  }
}
#--------------------------------------------------------------------------------------------
#terraform import azurerm_app_service_plan.app-service-plan /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netdevopsproject-rg/providers/Microsoft.Web/serverfarms/netdevopsproject-plan
#--------------------------------------------------------------------------------------------
resource "azurerm_app_service_plan" "app-service-plan" {
  name                = "${local.default_name}-AppServicePlan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  is_xenon = false
  kind     = "app"
  #    maximum_elastic_worker_count = 1
  #    maximum_number_of_workers    = 10

  sku {
    tier = "Standard"
    size = "S1"
  }

  tags = {
    Env = "${terraform.workspace}"
  }

}
#--------------------------------------------------------------------------------------------
#Every App Service web app you create must be assigned to a single App Service plan that runs it
#--------------------------------------------------------------------------------------------
# terraform import azurerm_app_service.app-service /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netdevopsproject-rg/providers/Microsoft.Web/sites/netdevopsproject
#--------------------------------------------------------------------------------------------
resource "azurerm_app_service" "app-service" {
  name                = "${local.default_name}-AppService"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.app-service-plan.id

  app_settings = {
    "APPINSIGHTS_INSTRUMENTATIONKEY" = azurerm_application_insights.app-insight.instrumentation_key
    "MSDEPLOY_RENAME_LOCKED_FILES"   = "1"
    "WEBSITE_NODE_DEFAULT_VERSION"   = "6.9.1"
  }

  client_affinity_enabled = true
  client_cert_enabled     = false
  enabled                 = true
  https_only              = false

  #    site_credential                = [
  #        {
  #            password = "b3Xp9tjb6BbAuLKrGGmffhfipX45rWfKnxDlWnNMzmA0t0LvcYrTWn7Lcar1"
  #            username = "$netdevopsproject"
  #        },
  #    ]

  #    source_control                 = [
  #        {
  #            branch   = "master"
  #            repo_url = "VSTSRM"
  #        },
  #    ]


  auth_settings {
    additional_login_params        = {}
    allowed_external_redirect_urls = []
    enabled                        = false
    token_refresh_extension_hours  = 0
    token_store_enabled            = false
  }


  logs {
    application_logs {
    }

    http_logs {
    }
  }

  site_config {
    always_on = false
    default_documents = [
      "Default.htm",
      "Default.html",
      "Default.asp",
      "index.htm",
      "index.html",
      "iisstart.htm",
      "default.aspx",
      "index.php",
      "hostingstart.html",
    ]
    dotnet_framework_version = "v4.0"
    ftps_state               = "AllAllowed"
    http2_enabled            = false
    ip_restriction           = []
    local_mysql_enabled      = false
    managed_pipeline_mode    = "Integrated"
    min_tls_version          = "1.2"
    php_version              = "7.3"
    remote_debugging_enabled = false
    #remote_debugging_version  = "VS2019"
    remote_debugging_version  = "VS2017"
    scm_type                  = "VSTSRM"
    use_32_bit_worker_process = true
    websockets_enabled        = false
  }

  tags = {
    Env = "${terraform.workspace}"
  }

}
#--------------------------------------------------------------------------------------------
#terraform import azurerm_application_insights.app-insight /subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/netdevopsproject-rg/providers/microsoft.insights/components/netdevopsproject
#--------------------------------------------------------------------------------------------
resource "azurerm_application_insights" "app-insight" {
  name                = "${local.default_name}-app-insights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"

  sampling_percentage                   = 0
  daily_data_cap_in_gb                  = 100
  daily_data_cap_notifications_disabled = false
  disable_ip_masking                    = false

  tags = {
    Env = "${terraform.workspace}"
  }
}

#--------------------------------------------------------------------------------------------

