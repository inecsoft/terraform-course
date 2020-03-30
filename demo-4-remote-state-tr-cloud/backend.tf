terraform {
  backend "remote" {
    organization = "inecsoft"

    workspaces {
      name = "cloud-terraform"
    }
  }
}

