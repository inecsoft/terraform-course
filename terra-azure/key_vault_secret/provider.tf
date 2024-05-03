#---------------------------------------------------------------
provider "azurerm" {
  # The "feature" block is required for AzureRM provider 2.x.
  # If you are using version 1.x, the "features" block is not allowed.
  #subscription_id =
  features {
    key_vault {
      purge_soft_delete_on_destroy = true
    }
  }
}
#---------------------------------------------------------------
/* Please run "terraform init" with either the "-reconfigure" or "-migrate-state" flags to */

terraform {
  backend "azurerm" {
    resource_group_name  = "TF-Azure-CDS-DevOps"
    storage_account_name = "cdsdevopsbackend"
    container_name       = "tstate"
    key                  = "terraform.tfstate"
    # subscription_id      =
    # tenant_id            =
    /* client_secret         =  "" */
  }
}

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.102.0"
    }
  }
}