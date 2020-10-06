#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}
#----------------------------------------------------------------------------
variable "redhat-user" {
  default = "ec2-user"
}
variable "ubuntu-user" {
  default = "ubuntu"
}
#-------------------------------------------------------------------
locals {
  default_name = "${join("-", list(terraform.workspace, "gitlab"))}"
}
#-------------------------------------------------------------------
#ssh-keygen -t ecdsa -b 384 -f lambda 
variable "PATH_TO_PRIVATE_KEY" {
  default = "gitlab"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "gitlab.pub"
}
#-------------------------------------------------------------------
resource "random_pet" "this" {
  length = 2
}
#-------------------------------------------------------------------
variable "AWS_REGION" {
 default = "eu-west-1"
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
variable "credentials" {
  default = {
    username = "admin"
    password = "admin123"
    engine   = "mysql"
    host     = "dbproxy.cfc8w0uxq929.eu-west-1.rds.amazonaws.com"
    port     = 3306
    dbname   = "proxydb"
    dbInstanceIdentifier = "dbproxy"
  }

  type = map(string)
}

#---------------------------------------------------------
variable "INSTANCE_DEVICE_NAME" {
  default = "/dev/xvdh"
}
#---------------------------------------------------------
variable "EXT_INSTANCE_DEVICE_NAME" {
  default = "/dev/xvdz"
}
#---------------------------------------------------------
variable "zone" {
  type = string
  default = "gitlab.inecsoft.co.uk"
  description = "describe domain for gitlab"
}
#---------------------------------------------------------