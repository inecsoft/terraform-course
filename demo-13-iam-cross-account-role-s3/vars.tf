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