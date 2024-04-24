#-------------------------------------------------------------------
locals {
  default_name = join("-",  tolist([terraform.workspace, "cds"]))
}
#-------------------------------------------------------------------
variable "location" {
  description = "The location where resources are created"
  type = string
  default = "West Europe"
}
#-------------------------------------------------------------------
variable "resource_group_name" {
  description = "The name of the resource group in which the resources are created"
  default     = "rg-virtualdesktop-cds"
}
#-------------------------------------------------------------------
variable "application_port" {
  description = "The port that you want to expose to the external load balancer"
  default     = 80
}
#-------------------------------------------------------------------
variable "admin_password" {
  description = "Default password for admin"
  default     = "Passwwoord11223344"
}
#-------------------------------------------------------------------

