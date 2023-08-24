#------------------------------------------------------------------

provider "aws" {
  #version = "~> 2.49"
  profile = "ivan-arteaga-dev"
  region  = var.region
  #alias   = ""

  default_tags {
    tags = {
      Owner       = "TFGM"
      Project     = "cloud-front-cdn"
      Repo        = "terraform-course"
      tech        = "terraform"
    }
  }
}
#-------------------------------------------------------------------

terraform {
  required_version = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.11.0"
    }
    vault = {
      source  = "hashicorp/vault"
      version = "~> 3.19.0"
    }
    github = {
      source = "integrations/github"
      version = "~> 5.32.0"
    }
  }

  /* backend "s3" {
    bucket = "inecsoft.co.uk"
    key    = "stage/dev/terraform.tfstate"
    region = var.region
  } */
}

#terraformer import aws --resources=cloudfront --profile=prod