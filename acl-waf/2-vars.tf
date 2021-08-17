#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
#----------------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#----------------------------------------------------------------------------------------
#In order to allow easy switching between versions you can define 
#a variable to allow the version number to be chosen dynamically
#----------------------------------------------------------------------------------------
variable "app_versions" {
  default = "20200923163119"
}
#----------------------------------------------------------------------------------------
variable "FUNCTION_NAME" {
  default = "serverlesfunction"
}
#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "dba"))
}
#-------------------------------------------------------------------
resource "random_pet" "this" {
  length = 2
}
#-------------------------------------------------------------------
resource "random_password" "master" {
  length = 10
}
#-------------------------------------------------------------------
data "aws_availability_zones" "azs" {}
#-------------------------------------------------------------------
data "aws_iam_account_alias" "current" {}
#-------------------------------------------------------------------
#---------------------------------------------------------
# The map here can come from other supported configurations
# like locals, resource attribute, map() built-in, etc.
#---------------------------------------------------------
locals {
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}
#---------------------------------------------------------
variable "phone_number" {
  type    = string
  default = "+447518527690"
}
#---------------------------------------------------------
variable "api_name" {
  type    = string
  default = "ACME-Shoes-rest-api"
}
#---------------------------------------------------------
variable "enable_alarms" {
  type    = string
  default = "1"
}
#---------------------------------------------------------
data "aws_caller_identity" "current" {}
#---------------------------------------------------------
variable "stage_name" {
  type    = string
  default = "dev"
}
#---------------------------------------------------------