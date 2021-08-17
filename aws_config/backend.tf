terraform {
  backend "s3" {
    bucket = "amplify-amplifyapp-dev-111710-deployment"
    key    = "terraform/terraform.state"
    region = "eu-west-1"
  }
}

