#declare variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"

}
#-------------------------------------------------------------------
variable "vpc_cidr_client" {
  default = "10.1.0.0/16"
}
#---------------------------------------------------------------------
variable "subnet_cidr_public_client" {
  type    = list(string)
  default = ["10.1.1.0/24", "10.1.2.0/24", "10.1.3.0/24"]
}
#--------------------------------------------------------------------
variable "subnet_cidr_private_client" {
  type    = list(string)
  default = ["10.1.101.0/24", "10.1.102.0/24", "10.1.103.0/24"]
}
variable "vpc_cidr_main" {
  default = "10.2.0.0/16"
}
#---------------------------------------------------------------------
variable "subnet_cidr_public_main" {
  type    = list(string)
  default = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"]
}
#--------------------------------------------------------------------
variable "subnet_cidr_private_main" {
  type    = list(string)
  default = ["10.2.101.0/24", "10.2.102.0/24", "10.2.103.0/24"]

}

#-------------------------------------------------------------------
#############################################################################
# DATA SOURCES
#############################################################################
data "aws_availability_zones" "azs_client" {
  provider = aws.client
}

data "aws_availability_zones" "azs_main" {
  provider = aws.main
}

data "aws_caller_identity" "main" {
  provider = aws.main
}

data "aws_caller_identity" "client" {
  provider = aws.client
}
#-------------------------------------------------------------------

variable "PATH_TO_PUBLIC_KEY" {
  default = "site-to-site-vpn.pub"
}
#-------------------------------------------------------------------
variable "instance_type" {
  type        = string
  description = "instance_type of the instances for the site-to-site-vpn"
  default     = "t3.micro"
}
#-------------------------------------------------------------------
