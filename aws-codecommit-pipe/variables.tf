#############################################################################
# VARIABLES
#############################################################################

variable "aws_bucket_prefix" {
  type    = string
  default = "tfgm"
}

variable "region" {
  type    = string
  default = "eu-west-1"
}

variable "state_bucket" {
  type        = string
  description = "Name of bucket for remote state"
}

variable "dynamodb_table_name" {
  type        = string
  description = "Name of dynamodb table for remote state locking"
}

variable "code_commit_user" {
  type        = string
  description = "Username of user to grant Power User access to Code Commit"
}


locals {
  bucket_name = "${var.aws_bucket_prefix}-build-logs-${random_integer.rand.result}"
}

#############################################################################
# DATA SOURCES
#############################################################################

data "aws_s3_bucket" "state_bucket" {
  bucket = var.state_bucket

}

data "aws_dynamodb_table" "state_table" {
  name = var.dynamodb_table_name
}

data "aws_iam_policy" "code_commit_power_user" {
  arn = "arn:aws:iam::aws:policy/AWSCodeCommitPowerUser"
}

#############################################################################
# RESOURCES
#############################################################################

resource "random_integer" "rand" {
  min = 10000
  max = 99999
}
#############################################################################
