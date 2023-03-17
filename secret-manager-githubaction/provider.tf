#------------------------------------------------------------------
provider "aws" {
  region = var.AWS_REGION
  #profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Jason Higgins"
      BusinessOwner = "DCS"
      Product       = "secrets"
      Repo          = "dcs-route53-domains"
      Tech          = "terraform"
      Environment   = "Prod"
    }
  }
}
#-------------------------------------------------------------------
terraform {
  required_version = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.58.0"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 2.2"
    }
  }

  /* backend "s3" {
    bucket = "secret-tfgm"
    key    = "secret/terraform.tfstate"
    region = "eu-west-1"
  } */
}
