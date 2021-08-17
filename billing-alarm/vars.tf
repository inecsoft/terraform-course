#declare variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "us-east-1"
}
#-------------------------------------------------------------------
data "aws_availability_zones" "azs" {}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}
#---------------------------------------------------------------------
variable "subnet_cidr_public" {
  type    = list(any)
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]

}
#--------------------------------------------------------------------
variable "subnet_cidr_private" {
  type    = list(any)
  default = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

}
#-------------------------------------------------------------------
locals {
  default_name = join("-", list(terraform.workspace, "billing-alert"))
}
#-------------------------------------------------------------------
variable "currency" {
  description = "Short notation for currency type (e.g. USD, CAD, EUR)"
  default     = "USD"
}
#-------------------------------------------------------------------
data "aws_caller_identity" "current" {}
#-------------------------------------------------------------------
