data "azuread_service_principal" "sp" {
  display_name = "inesoftnodejsapppull"
}
output "azure_ad_service_principal_id" {
  value = "${data.azuread_service_principal.sp.id}"
}