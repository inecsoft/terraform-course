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

##################################################################################