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
  default_name = join("-", list(terraform.workspace, "spot-fleet"))
}
#-------------------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f lambda 
variable "PATH_TO_PRIVATE_KEY" {
  default = "spot-fleet"
}
#--------------------------------------------------------------------------------------
variable "PATH_TO_PUBLIC_KEY" {
  default = "spot-fleet.pub"
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
