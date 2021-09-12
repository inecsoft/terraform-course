##################################################################################
# VARIABLES
##################################################################################

variable "region" {
  type    = string
  default = "eu-west-1"
}

#Bucket variables
variable "aws_bucket_prefix" {
  type    = string
  default = "globo"
}

variable "aws_dynamodb_table" {
  type    = string
  default = "globo-tfstatelock"
}

variable "full_access_users" {
  type    = list(string)
  default = []

}

variable "read_only_users" {
  type    = list(string)
  default = []
}

resource "random_integer" "rand" {
  min = 10000
  max = 99999
}

locals {

  dynamodb_table_name = "${var.aws_dynamodb_table}-${random_integer.rand.result}"
  bucket_name         = "${var.aws_bucket_prefix}-${random_integer.rand.result}"
}

##################################################################################