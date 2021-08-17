#------------------------------------------------------------------
provider "aws" {
  region  = var.AWS_REGION
  profile = "dumy"
}

terraform {
  required_version = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.20"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 2.2"
    }
    vault = {
      source  = "hashicorp/vault"
      version = "~> 2.16"
    }
  }

  backend "s3" {
    bucket  = "s3-bucket-dumy-project"
    key     = "dumy/terraform.tfstate"
    region  = "eu-west-1"
    profile = "dumy"
  }
}
#-------------------------------------------------------------------
