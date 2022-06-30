provider "aws" {
  #version = "~> 2.49"
  profile = "log-dev-beenetwork"
  region  = var.region_log-dev-beenetwork
  alias   = "log-dev-beenetwork"
  default_tags {
    tags = {
      Owner       = "TFGM"
      Project     = "Beenetwork"
      Repo        = "tf_tfgm_organizations"
      tech        = "terraform"
    }
  }
}

provider "aws" {
  #version = "~> 2.49"
  profile = "tfgm"
  region  = var.region_prod
  alias   = "tfgm"

  default_tags {
    tags = {
      Owner       = "TFGM"
      Project     = "Beenetwork"
      Repo        = "tf_tfgm_organizations"
      tech        = "terraform"
    }
  }
}