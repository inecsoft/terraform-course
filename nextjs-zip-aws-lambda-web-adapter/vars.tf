variable "memory_size" {
  type    = number
  default = 512
}

variable "NodeRuntime" {
  type    = string
  default = "nodejs18.x"
}

variable "timeout" {
  type    = number
  default = 10

}

variable "LAMBDA_FUNCTION_NAME" {
  type    = string
  default = "nextjs-zip-terraform"
}

variable "AWS_LAMBDA_EXEC_WRAPPER" {
  type    = string
  default = "/opt/bootstrap"
}

variable "PORT" {
  type    = number
  default = 8000
}

variable "REGION" {
  type      = string
  sensitive = true
  default   = "eu-west-1"
}


variable "zone" {
  type        = string
  description = "describe sub-domain for api"
  default     = "api.inecsoft.co.uk"
}
#-------------------------------------------------------------------
#declare variables
#-------------------------------------------------------------------
variable "AWS_REGION" {
  default = "eu-west-1"
}

variable "AWS_REGION_client" {
  default = "eu-west-1"
}

variable "AWS_REGION_main" {
  default = "eu-west-2"
}
#-------------------------------------------------------------------
variable "vpc" {
  type = map(any)
  default = {
    dev-vpc   = "10.1.0.0/16"
    qa-vpc    = "10.2.0.0/16"
    shrd-vpc  = "10.3.0.0/16"
    cadev-vpc = "10.4.0.0/16"
  }
}
#-------------------------------------------------------------------

#-------------------------------------------------------------------
data "aws_availability_zones" "azs" {}

variable "dev-vpc_cidr" {
  default = "10.1.0.0/16"
}
variable "qa-vpc_cidr" {
  default = "10.2.0.0/16"
}
variable "shrd-vpc_cidr" {
  default = "10.3.0.0/16"
}
variable "cadev-vpc_cidr" {
  default = "10.4.0.0/16"
}
#---------------------------------------------------------------------
variable "dev_subnet_cidr_public" {
  type    = list(any)
  default = ["10.1.1.0/24", "10.1.2.0/24", "10.1.3.0/24"]
}
variable "qa_subnet_cidr_public" {
  type    = list(any)
  default = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"]
}
variable "shrd_subnet_cidr_public" {
  type    = list(any)
  default = ["10.3.1.0/24", "10.3.2.0/24", "10.3.3.0/24"]
}
variable "cadev_subnet_cidr_public" {
  type    = list(any)
  default = ["10.4.1.0/24", "10.4.2.0/24", "10.4.3.0/24"]
}
variable "public-subnets" {
  type = map(any)
  default = {
    dev-public-subnet   = ["10.1.1.0/24", "10.1.2.0/24", "10.1.3.0/24"]
    qa-public-subnet    = ["10.2.1.0/24", "10.2.2.0/24", "10.2.3.0/24"]
    shrd-public-subnet  = ["10.3.1.0/24", "10.3.2.0/24", "10.3.3.0/24"]
    cadev-public-subnet = ["10.4.1.0/24", "10.4.2.0/24", "10.4.3.0/24"]

  }
}
variable "private-subnets" {
  type = map(any)
  default = {
    dev-private-subnet   = ["10.1.101.0/24", "10.1.102.0/24", "10.1.103.0/24"]
    qa-private-subnet    = ["10.2.101.0/24", "10.2.102.0/24", "10.2.103.0/24"]
    shrd-private-subnet  = ["10.3.101.0/24", "10.3.102.0/24", "10.3.103.0/24"]
    cadev-private-subnet = ["10.4.101.0/24", "10.4.102.0/24", "10.4.103.0/24"]
  }
}

#--------------------------------------------------------------------
variable "dev_subnet_cidr_private" {
  type    = list(any)
  default = ["10.1.101.0/24", "10.1.102.0/24", "10.1.103.0/24"]
}
variable "qa_subnet_cidr_private" {
  type    = list(any)
  default = ["10.2.101.0/24", "10.2.102.0/24", "10.2.103.0/24"]
}
variable "shrd_subnet_cidr_private" {
  type    = list(any)
  default = ["10.3.101.0/24", "10.3.102.0/24", "10.3.103.0/24"]
}
variable "cadev_subnet_cidr_private" {
  type    = list(any)
  default = ["10.4.101.0/24", "10.4.102.0/24", "10.4.103.0/24"]
}
#-------------------------------------------------------------------
locals {
  default_name = join("-", tolist([terraform.workspace, "inecsoft"]))
}
#-------------------------------------------------------------------
#############################################################################
# DATA SOURCES
#############################################################################
data "aws_caller_identity" "main" {
  provider = aws.main
}

data "aws_caller_identity" "client" {
  provider = aws.client
}
#-------------------------------------------------------------------
data "aws_availability_zones" "azs_main" {
  provider = aws.main
}

data "aws_availability_zones" "azs_client" {
  provider = aws.client
}

#-------------------------------------------------------------------