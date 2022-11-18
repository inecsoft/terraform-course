provider "aws" {
  region = var.aws_region
  profile = "tfgm"
  
  default_tags {
    tags = {
      Owner       = "TFGM"
      Project     = "lambda-java"
      Repo        = "national-rail-lambda"
      tech        = "terraform"
    }
  }
}

terraform {
  required_version = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>4.20.0"
    }
    template = {
      source  = "hashicorp/template"
      version = "~> 2.2"
    }
  }

  /* backend "s3" {
    bucket  = "terraform-tfgm"
    key     = "route-53/terraform.tfstate"
    region  = "eu-west-1"
    profile = "tfgm"
  } */
}
