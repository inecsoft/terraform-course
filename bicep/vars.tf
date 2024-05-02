#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "inecsoft"))}"
}
#-------------------------------------------------------------------
variable "location" {
  default = "UK West"
}
