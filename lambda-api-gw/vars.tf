#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
#----------------------------------------------------------------------------
provider "aws" {
  region = "eu-west-1"
}
#----------------------------------------------------------------------------------------
#In order to allow easy switching between versions you can define 
#a variable to allow the version number to be chosen dynamically
#----------------------------------------------------------------------------------------
variable "app_version" {
}
#----------------------------------------------------------------------------------------
variable "FUNCTION_NAME" {
  default = "serverlesfunction"
}
#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "lambda"))
}
#-------------------------------------------------------------------
resource "random_pet" "this" {
  length = 2
}
#-------------------------------------------------------------------

