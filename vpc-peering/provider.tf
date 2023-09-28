provider "aws" {
  region = var.AWS_REGION
  alias  = "main"
  #profile = "tfgm"
  profile = "ivan-arteaga-dev"
}

provider "aws" {
  region = var.AWS_REGION
  alias  = "client"
  profile = "ivan-arteaga-dev"
}