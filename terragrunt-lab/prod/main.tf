terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "3.7"
    }
  }
  backend "s3" {}

}

provider "aws" {
  region  = "us-west-1"
  profile = "ivan-arteaga-dev"

}

resource "aws_s3_bucket" "prod" {
  bucket = "terragrunt-prod-bucket"

}