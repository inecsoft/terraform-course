# Configure the AWS Provider
provider "aws" {
  region = var.AWS_REGION_main
  alias  = "main"
  #profile = "tfgm"
  profile = "ivan-arteaga-dev"
}

provider "aws" {
  region  = "us-east-1"
  alias   = "cloudfront"
  profile = "ivan-arteaga-dev"
}

provider "aws" {
  region  = var.AWS_REGION
  profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "winglang"
      Repo          = "winglang"
      Tech          = "terraform"
      Environment   = "Prod"
    }
  }
}

terraform {
  /* backend "s3" {
    bucket         = "<tf-state-bucket-name>"
    key            = "nextjs_app_backend/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "tf-state-lock"
    encrypt        = true

  } */

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # version = "5.26.0"
    }
    archive = {
      source  = "hashicorp/archive"
      # version = "2.4.0"
    }
  }

  # required_version = "~> 1.5.1"
}


