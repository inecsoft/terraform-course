#--------------------------------------------------------------------------------------------------
provider "aws" {
  region  = var.AWS_REGION
  profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "capture-aws-sign-in"
      Repo          = "capture-aws-sign-in"
      Tech          = "terraform"
      Environment   = "Prod"
    }
  }
}

terraform {
  /* backend "s3" {
    bucket         = "<tf-state-bucket-name>"
    key            = "terraform/terraform.state"
    region         = "eu-west-1"
    dynamodb_table = "tf-state-lock"
    encrypt        = true

  } */

  required_providers {
    aws = {
      source = "hashicorp/aws"
      # version = "5.26.0"
    }
    archive = {
      source = "hashicorp/archive"
      # version = "2.4.0"
    }
  }

  # required_version = "~> 1.5.1"
}

#--------------------------------------------------------------------------------------------------
data "aws_availability_zones" "available" {
}
#--------------------------------------------------------------------------------------------------
data "aws_caller_identity" "current" {
}
#--------------------------------------------------------------------------------------------------