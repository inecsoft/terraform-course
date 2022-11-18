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
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.response_body)}/32"
}
#----------------------------------------------------------------------------
variable "redhat-user" {
  default = "ec2-user"
}
#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "api2-lambda-dynamodb"))
}
#-------------------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f lambda 
variable "PATH_TO_PRIVATE_KEY" {
  default = "api2-lambda-dynamodb"
}
#--------------------------------------------------------------------------------------
variable "PATH_TO_PUBLIC_KEY" {
  default = "api2-lambda-dynamodb.pub"
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
variable "instance_type" {
  default = "t2.micro"
}
#------------------------------------------------------------------------
variable "profile" {
  default = "default"
}
#------------------------------------------------------------------------
variable "zone" {
  type        = string
  description = "describe sub-domain for api"
  default     = "api.inecsoft.co.uk"
}
#----------------------------------------------------------------------------
resource "random_password" "password" {
  length           = 16
  special          = true
  override_special = "_%@\""
  #override_special = "%\"@_"
}
#echo random_password.password.result | terraform console
#----------------------------------------------------------------------------
resource "random_string" "random" {
  length  = 2
  special = false
}
#----------------------------------------------------------------------------
locals {
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}
#----------------------------------------------------------------------------
resource "random_integer" "integer" {
  min = 4
  max = 6
}
#----------------------------------------------------------------------------
variable "lambda-name" {
  type = list(string)
  default = [
    "connect",
    "disconnect",
    "default"
  ]
}

#----------------------------------------------------------------------------------------