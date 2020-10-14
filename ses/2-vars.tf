#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}
#--------------------------------------------------------------------------------------
locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
#----------------------------------------------------------------------------
variable "redhat-user" {
  default = "ec2-user"
}
#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "ses"))}"
}
#-------------------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f lambda 
variable "PATH_TO_PRIVATE_KEY" {
  default = "codedeploycodecommitasg"
}
#--------------------------------------------------------------------------------------
variable "PATH_TO_PUBLIC_KEY" {
  default = "codedeploycodecommitasg.pub"
}
#-------------------------------------------------------------------
resource "random_pet" "this" {
  length = 2
}
#-------------------------------------------------------------------
data "aws_availability_zones" "azs" {}
#-------------------------------------------------------------------
data "aws_iam_account_alias" "current" {}
data "aws_caller_identity" "current" {}
#-------------------------------------------------------------------
#---------------------------------------------------------
# The map here can come from other supported configurations
# like locals, resource attribute, map() built-in, etc.
#---------------------------------------------------------
variable "domain" {
  default = "email.inecsoft.co.uk"
}
#------------------------------------------------------------------------
variable "profile" {
  description = "the profile for the aws credential for the project"
  default = "default"
}
#------------------------------------------------------------------------
locals {
  user-id = formatdate("YYYYMMDDHHmmss", timestamp())
}
#------------------------------------------------------------------------
resource "random_uuid" "uuid" {}
#------------------------------------------------------------------------
resource "random_integer" "interger" {
  min     = 4
  max     = 7
}
#------------------------------------------------------------------------
variable "currency" {
  description = "Short notation for currency type (e.g. USD, CAD, EUR)"
  default     = "USD"
}
#-------------------------------------------------------------------
locals {
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}
#-------------------------------------------------------------------