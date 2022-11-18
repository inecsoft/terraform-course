#-------------------------------------------------------------------
#set the environment variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}

variable "PATH_TO_PRIVATE_KEY" {
  default = "mykey"
}

variable "PATH_TO_PUBLIC_KEY" {
  default = "mykey.pub"
}

variable "AMIS" {
  type = map(string)
  default = {
    us-east-1 = "ami-13be557e"
    us-west-2 = "ami-06b94666"
    eu-west-1 = "ami-844e0bf7"
  }
}


variable "INSTANCE_USERNAME" {
  default = "ec2-user"
}

#--------------------------------------------------------------------------------------
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.response_body)}/32"
}
#----------------------------------------------------------------------------
locals {
  default_name = join("-", tolist([terraform.workspace, "cwagent"]))
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
#---------------------------------------------------------
locals {
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}

#---------------------------------------------------------
data "aws_caller_identity" "current" {}
#---------------------------------------------------------
