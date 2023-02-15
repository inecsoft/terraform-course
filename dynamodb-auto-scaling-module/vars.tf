#-----------------------------------------------------------------------------------------------v
variable "AWS_REGION" {
  default = "eu-west-1"
}
#-----------------------------------------------------------------------------------------------
variable "profile" {
  default = "default"
}
#-----------------------------------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "storage"))
}
#-----------------------------------------------------------------------------------------------