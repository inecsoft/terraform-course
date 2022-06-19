provider "aws" {
  #version = "~> 2.49"
  profile = "log-dev-beenetwork"
  region  = var.region_log-dev-beenetwork
  alias   = "log-dev-beenetwork"
}

provider "aws" {
  #version = "~> 2.49"
  profile = "tfgm"
  region  = var.region_prod
  alias   = "tfgm"
}