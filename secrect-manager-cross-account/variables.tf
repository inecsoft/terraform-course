variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "eu-west-1"
}

data "aws_caller_identity" "dev" {
  #provider = aws.tfgm
}