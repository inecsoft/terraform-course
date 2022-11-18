#-------------------------------------------------------------------
#set the environment variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#-------------------------------------------------------------------
variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}
#-------------------------------------------------------------------
variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}
#-------------------------------------------------------------------
variable "RDS_USERNAME" {
  default = "ivanpedro"
}
variable "RDS_PASSWORD" {
  default = "*cubasalsa123!!!"
}
variable "RDS_DB_NAME" {
  default = "zappadb"
}
variable "RDS_DB_IDENTIFIER" {
  default = "demodb-postgres"
}
#----------------------------------------------------------------------------
resource "random_password" "password" {
  length  = 20
  special = true
  #override_special = "_@\/ "
}
#----------------------------------------------------------------------------
resource "random_string" "random" {
  length  = 3
  special = false
}
#----------------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "zappa"))
}
#-------------------------------------------------------------------
data "aws_availability_zones" "available" {}
#-------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.response_body)}/32"
}
#----------------------------------------------------------------------------
