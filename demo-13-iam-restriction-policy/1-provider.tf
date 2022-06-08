#------------------------------------------------------------------
provider "aws" {
  region = var.AWS_REGION
  default_tags {
    tags = {
      Owner       = "Inecsoft"
      Project     = "organazations"
      Repo        = "terraform-course"
      tech        = "terraform"
    }
  }
}
#-------------------------------------------------------------------
