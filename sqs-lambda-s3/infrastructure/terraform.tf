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

  required_version = "~> 1.4"

  #echo aws_s3_bucket.lambda_bucket.id | terraform console
  /* backend "s3" {
    bucket = aws_s3_bucket.lambda_bucket.id
    key    = "terraform/terraform.state"
    region = "eu-west-1"
  } */
}

