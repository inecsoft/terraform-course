provider "aws" {
  region  = "eu-west-1"
  profile = "tfgm"

  assume_role {
    role_arn = "arn:aws:iam::610776623993:role/assume_role"
  }
}