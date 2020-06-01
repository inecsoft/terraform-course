#-------------------------------------------------------------------$
provider "github" {
  #token        = var.github_token
  token        = file("~/.ssh/githubtoken")
  organization = var.github_organization
  #individual    = true
}
#-------------------------------------------------------------------$

