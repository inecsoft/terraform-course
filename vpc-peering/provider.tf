provider "aws" {
  region = var.AWS_REGION_main
  alias  = "main"
  #profile = "tfgm"
  profile = "ivan-arteaga-dev"
}

provider "aws" {
  region = var.AWS_REGION_client
  alias  = "client"
  profile = "ivan-arteaga-dev"
}

provider "aws" {
  region = var.AWS_REGION
  profile = "ivan-arteaga-dev"
}