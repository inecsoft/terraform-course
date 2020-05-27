#---------------------------------------------------------------------------------
data "azuread_service_principal" "sp" {
  display_name = "inesoftnodejsapppull"
}
#---------------------------------------------------------------------------------
output "azure_ad_service_principal_id" {
  value = "${data.azuread_service_principal.sp.id}"
}
#---------------------------------------------------------------------------------
output "sp_id" {
  value =  data.azuread_service_principal.sp.id
}
#----------------------------------------------------------------------
data "azuread_application" "example" {
  name = "inesoftnodejsapppull"
}
#----------------------------------------------------------------------
#user assignment to grant access to the repo
#----------------------------------------------------------------------
data "azurerm_subscription" "primary" {
}

data "azurerm_client_config" "example" {
}
data "azurerm_container_registry" "cr" {
  name                = "inesoftnodejsapp"
  resource_group_name = "${local.default_name}-RG"
}
#----------------------------------------------------------------------
resource "azurerm_role_assignment" "role-ass" {
  #name                 = "repoaccess"
  scope                = data.azurerm_container_registry.cr.id
  role_definition_name = "acrpull"
  #for user
  #principal_id         = data.azurerm_client_config.example.object_id
  #for role
  principal_id         =  azuread_service_principal.sp.id
}
#----------------------------------------------------------------------
#az keyvault secret show --vault-name <vault-name> --name <secret-name>
#----------------------------------------------------------------------
resource "azuread_application" "app" {
  name          = "newinesoftnodejsapp"
  available_to_other_tenants = false
  oauth2_allow_implicit_flow = true
}
resource "azuread_application_password" "app-p" {
  application_object_id = azuread_application.app.id
  value          = "VT=uSgbTanZhyz@%nL9Hpd+Tfay_MRV#"
  end_date       = "2099-01-01T01:02:03Z"
}
resource "azuread_service_principal" "sp" {
  application_id = azuread_application.app.application_id

  tags =[ 
   "Env = "${terraform.workspace}"
  ]
}




#----------------------------------------------------------------------
#resource "azuread_service_principal_password" "spp" {
#  service_principal_id = azuread_service_principal.sp.id
#  value                = azuread_application.app.id
# end_date             = "2021-01-01T01:02:03Z"
#}
#----------------------------------------------------------------------
#output "role_id" {
#  value = azurerm_role_definition.rd.id
#}
#----------------------------------------------------------------------
#resource "azurerm_role_definition" "rd" {
#    name               = "AcrPull"
#    description        = "acr pull"
#    scope                = data.azurerm_container_registry.cr.id
#    #id                 = "/subscriptions/15676026-e695-4981-b84d-7d316b6e528f/providers/Microsoft.Authorization/roleDefinitions/7f951dda-4ed3-4680-a7ca-43fe172d538d"
#    #role_definition_id = "7f951dda-4ed3-4680-a7ca-43fe172d538d"
#
#    permissions {
#        actions          = [
#            "Microsoft.ContainerRegistry/registries/pull/read",
#        ]
#        data_actions     = []
#        not_actions      = []
#        not_data_actions = []
#    }
#
#    assignable_scopes  = [
#        "/",
#    ]
#    timeouts {}
#}
#----------------------------------------------------------------------

