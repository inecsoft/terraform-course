terraform {

  required_providers {

    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.66.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.3.0"
    }
  }

  required_version = "~> 1.1"

  #echo aws_s3_bucket.lambda_bucket.id | terraform console
  /* backend "s3" {
    bucket = aws_s3_bucket.lambda_bucket.id
    key    = "terraform/terraform.state"
    region = "eu-west-1"
  } */
}

provider "aws" {
  region = var.aws_region
  profile = "ivan-arteaga-dev"

  default_tags {
    tags = {
      Environment = "DEV"
      Name        = "secrect-cross-account"
      company     = "TFGM"
    }
  }
}

provider "aws" {
  #version = "~> 2.49"
  profile = "tfgm"
  region = var.aws_region
  alias  = "prod"
}