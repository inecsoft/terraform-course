#---------------------------------------------------------------
provider "azurerm" {
  # The "feature" block is required for AzureRM provider 2.x. 
  # If you are using version 1.x, the "features" block is not allowed.
  version = "~>2.0"
  features {}
}
#---------------------------------------------------------------
provider "azuread" {
  version = "=0.8.0"
}
#---------------------------------------------------------------

