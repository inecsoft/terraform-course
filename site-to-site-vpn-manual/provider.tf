provider "aws" {
  region = var.AWS_REGION
  alias  = "main"
  #profile = "tfgm"
  profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "site-to-site-vpn"
      Repo          = "site-to-site-vpn"
      Tech          = "terraform"
      Environment   = "Prod"
    }
  }
}

provider "aws" {
  region  = var.AWS_REGION
  alias   = "client"
  profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "site-to-site-vpn"
      Repo          = "site-to-site-vpn"
      Tech          = "terraform"
      Environment   = "Prod"
    }
  }
}

provider "aws" {
  region  = var.AWS_REGION
  profile = "ivan-arteaga-dev"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "site-to-site-vpn"
      Repo          = "site-to-site-vpn"
      Tech          = "terraform"
      Environment   = "Prod"
    }
  }
}