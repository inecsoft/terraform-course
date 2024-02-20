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

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "subnet_cidr_public" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "subnet_cidr_private" {
  type    = list(string)
  default = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
}