variable "region_log-dev-beenetwork" {
  type        = string
  description = "description"
  default     = "eu-west-1"
}

variable "region_prod" {
  type        = string
  description = "description"
  default     = "eu-west-1"
}


data "aws_caller_identity" "prod" {
  provider = aws.tfgm
}

data "aws_caller_identity" "log-dev-beenetwork" {
  provider = aws.log-dev-beenetwork
}

variable "region" {
  type        = string
  description = "default region for the project"
  default     = "eu-west-1"
}


#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.body)}/32"
}

#-------------------------------------------------------------------
locals {
  default_name = join("-", tolist([terraform.workspace, "cloudfront"]))
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

#---------------------------------------------------------
locals {
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}
#---------------------------------------------------------