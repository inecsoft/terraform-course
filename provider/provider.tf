#---------------------------------------------------------
provider "aws" {
  region                  = var.AWS_REGION
  shared_credentials_file = "~/.aws/credentials"
  profile                 = var.profile
}
#---------------------------------------------------------
#[cmrs]
#aws_access_key_id = 
#aws_secret_access_key = 

#---------------------------------------------------------
