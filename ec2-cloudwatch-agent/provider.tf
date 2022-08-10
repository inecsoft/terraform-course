provider "aws" {
  region  = "eu-west-2"
  profile = "tfgm"
  #alias   = "log-dev-beenetwork"

  default_tags {
    tags = {
      Owner   = "TFGM"
      Project = "Beenetwork"
      Repo    = "beenet_tf_aws_elasticsearch"
      tech    = "terraform"
    }
  }
}