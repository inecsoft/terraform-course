#---------------------------------------------------------
provider "aws" {
  region                  = var.AWS_REGION
  shared_credentials_file = "~/.aws/credentials"
  profile                 = var.profile
}
#---------------------------------------------------------
provider "github" {
  #token        = var.github_token
  token        = file(" ~/.ssh/webhooktoken")
  organization = var.github_organization
  individual   = false
}

#---------------------------------------------------------
