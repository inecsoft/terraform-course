variable "region" {
  type        = string
  description = "default region for the project"
  default     = "eu-west-1"
}

locals {
  stack_name = "react-cors-spa-stack"
  default_name = "waf"
}

data "aws_region" "current" {}

data "aws_caller_identity" "current" {}