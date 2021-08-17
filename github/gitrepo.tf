#-------------------------------------------------------------------$
resource "github_repository" "git-devops" {
  name        = "git-devops"
  description = "Repository for public terraform code using in Otus DevOps course"
}
#-------------------------------------------------------------------$
resource "github_repository_webhook" "webhook" {
  #repository = "${github_repository.repo.name}"
  repository = github_repository.git-devops.name


  configuration {
    url          = "http://google.com"
    content_type = "json"
    insecure_ssl = false
    #    secret       = local.webhook_secret
  }
  active = false
  events = ["push"]
}
#-------------------------------------------------------------------$

