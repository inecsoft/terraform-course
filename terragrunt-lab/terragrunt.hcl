generate "provider" {
	path = "provider.tf"
	if_exists = "overwrite_terragrunt"
	contents = <<EOF
provider "aws" {
	profile = "ivan-arteaga-dev"
	region = "eu-west-1"
  default_tags {
    tags = {
      Owner         = "TFGM"
      ProductOwner  = "Ivan Pedro"
      BusinessOwner = "DCS"
      Product       = "secrets"
      Repo          = "secrect"
      Tech          = "terraform"
      Environment   = "root"
    }
  }
}
EOF
}

# Remote backend settings for all child directories
remote_state {
  backend = "s3"
  config = {
    bucket         = "anthena-tfgm"
    key            = "${path_relative_to_include()}/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    #dynamodb_table = "terraform-state-lock"
    profile = "ivan-arteaga-dev"
  }
}


