terraform {
  required_version = ">= 0.14"
}

provider "aws" {
  region  = "eu-west-2"
  profile = "dumy"
}
