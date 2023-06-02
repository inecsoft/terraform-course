#------------------------------------------------------------------
provider "aws" {
  region = var.AWS_REGION
  profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "secrets"
      Repo          = "secrect"
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

  backend "s3" {
    bucket = "anthena-tfgm"
    key    = "anthena/terraform.tfstate"
    region = "eu-west-1"
    profile = "ivan-arteaga-dev"
  }
}

resource "aws_s3_bucket" "bucket_backend" {
  bucket = "anthena-tfgm"

  tags = {
    Name        = "anthena-tfgm"
    Environment = "Dev"
  }
}

resource "aws_s3_bucket_ownership_controls" "bucket_backend" {
  bucket = aws_s3_bucket.bucket_backend.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "bucket_backend_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.bucket_backend]

  bucket = aws_s3_bucket.bucket_backend.id
  acl    = "private"
}