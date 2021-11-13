#------------------------------------------------------------------
provider "aws" {
  region = var.AWS_REGION
}
#-------------------------------------------------------------------
terraform {
  # experiments      = [provider_sensitive_attrs]
  required_version = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.64.0"
    }
    vault = {
      source  = "hashicorp/vault"
      version = "~> 2.16.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 4.18.0"
    }
  }
  backend "s3" {
    bucket = "inecsoft.co.uk"
    key    = "stage/dev/terraform.tfstate"
    region = "eu-west-1"
  }
}
#-------------------------------------------------------------------