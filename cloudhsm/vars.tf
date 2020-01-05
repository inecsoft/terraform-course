variable "AWS_REGION" {
  description = "AWS region to launch cloudHSM cluster."
  default     = "eu-west-1"
}

variable "subnets" {
  type    = "list"
  default = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

data "aws_availability_zones" "available" {}
 
locals {
  default_name = "${join("-", list(terraform.workspace, "cloudhsm"))}"
}
