#------------------------------------------------------------------
provider "aws" {
  region = var.AWS_REGION
}
#-------------------------------------------------------------------
provider "github" {
  #token        = var.github_token
  #token        = file("~/.ssh/githubtoken")
  token        = data.aws_ssm_parameter.ssm-parameter-webhook-access-token.value
  organization = var.github_organization
  #individual    = true
}
terraform {
  experiments      = [provider_sensitive_attrs]
  required_version = ">= 0.14"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.20.0"
    }
    vault = {
      source  = "hashicorp/vault"
      version = "~> 2.16.0"
    }
    github = {
      source = "hashicorp/github"
      #version = "~> 2.16.0" 
    }
  }
  backend "s3" {
    bucket = "inecsoft.co.uk"
    key    = "stage/dev/terraform.tfstate"
    region = "eu-west-1"
  }
}
#-------------------------------------------------------------------