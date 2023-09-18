variable "region" {
  type        = string
  description = "default region for the project"
  default     = "eu-west-1"
}

locals {
  stack_name  = "s3-lambda"
  app_version = formatdate("YYYYMMDDHHmmss", timestamp())
}


data "aws_region" "current" {}

data "aws_caller_identity" "current" {}