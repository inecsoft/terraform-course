#----------------------------------------------------------------------------
resource "random_password" "password" {
  length  = 20
  special = true
  #override_special = "_@\/ "
}
#--------------------------------------------------------------------------------------

#-------------------------------------------------------------------
#----------------------------------------------------------------------------
locals {
  default_name = join("-", tolist([terraform.workspace, "fargate"]))
}
#-------------------------------------------------------------------
data "aws_caller_identity" "current" {}

#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}
#-------------------------------------------------------------------
variable "region" {
  default = "eu-west-1"
}

variable "ecs_cluster" {
  default = "ecs-fargate-cluster"
}

variable "key_pair_name" {
  default = "bastion-key"
}

variable "max_instance_size" {
  default = 5
}

variable "min_instance_size" {
  default = 1
}

variable "desired_capacity" {
  default = 1
}

variable "ami" {
  type = map(string)
  default = {
    "eu-west-2" = "ami-00a1270ce1e007c27"
    "eu-west-1" = "ami-0ce71448843cb18a1"
    "eu-west-3" = "ami-03b4b78aae82b30f1"
  }
}

data "aws_availability_zones" "azs" {
}



########################################################################################
data "http" "workstation-external-ip" {
  url = "http://ipv4.icanhazip.com"
}

locals {
  workstation-external-cidr = "${chomp(data.http.workstation-external-ip.response_body)}/32"
}

variable "name" {
  default = "Some useful name"
}