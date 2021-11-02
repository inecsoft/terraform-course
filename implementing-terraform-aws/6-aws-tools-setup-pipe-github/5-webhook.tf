#-------------------------------------------------------------------------------------------------
# 1.Store your sensitive information in either AWS Systems Manager Parameter Store or Secrets Manager.
# For AWS Systems Manager Parameter Store, run the following command:
# aws ssm put-parameter --type SecureString --name awsExampleParameter --value awsExampleValue
# For Secrets Manager, run the following command:
# aws secretsmanager create-secret --name awsExampleParameter --secret-string awsExampleValue
# "arn:aws:ssm:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:parameter/awsExampleParameter",
# "arn:aws:secretsmanager:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:secret:awsExampleParameter*"
#-------------------------------------------------------------------------------------------------
#aws ssm put-parameter --type SecureString --name WEBHOOK_ACCESS_TOKEN --value awsExampleValue
#data "aws_ssm_parameter" "ssm-parameter-webhook-access-token" {
#   name = "WEBHOOK_ACCESS_TOKEN"
# }
#--------------------------------------------------------------------------------
# Wire the CodePipeline webhook into a GitHub repository.
#--------------------------------------------------------------------------------
resource "github_repository_webhook" "github-repository-webhook" {
  repository = github_repository.git-devops-go.name

  configuration {
    url          = aws_codepipeline_webhook.codepipeline-webhook.url
    content_type = "json"
    insecure_ssl = true
    # secret       = local.webhook_secret
    #secret       = data.aws_ssm_parameter.ssm-parameter-webhook-access-token.value
    secret = jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["WEBHOOK_ACCESS_TOKEN"]
  }

  events = ["push"]
}
#--------------------------------------------------------------------------------
# locals {
#   webhook_secret = "super-secret"
# }
#--------------------------------------------------------------------------------
resource "aws_codepipeline_webhook" "codepipeline-webhook" {
  name            = "${local.default_name}-webhook-github"
  authentication  = "GITHUB_HMAC"
  target_action   = "Source"
  target_pipeline = aws_codepipeline.codepipeline.name

  authentication_configuration {
    #secret_token = local.webhook_secret
    #secret_token       = data.aws_ssm_parameter.ssm-parameter-webhook-access-token.value
    secret_token = jsondecode(aws_secretsmanager_secret_version.secret_version.secret_string)["WEBHOOK_ACCESS_TOKEN"]
  }

  filter {
    json_path    = "$.ref"
    match_equals = "refs/heads/{Branch}"
  }
}
#--------------------------------------------------------------------------------
# terraform untaint  github_repository.git-devops-go
#422 Your current plan does not support GitHub Pages for this repository. []
#--------------------------------------------------------------------------------
resource "github_repository" "git-devops-go" {
  name        = "git-devops-go"
  description = "Repository for public terraform code using in Otus DevOps course"
  visibility  = "private"

  pages {

    source {
      branch = "master"
      path   = "/"
    }
  }

  # template {
  #   owner      = "inecsoft"
  #   # repository = "terraform-module-template"
  # }
}
#--------------------------------------------------------------------------------
# resource "github_repository_webhook" "webhook" {
#   #repository = "${github_repository.repo.name}"
#   repository = github_repository.git-devops.name


#   configuration {
#     url          = "http://google.com" 
#     content_type = "json"
#     insecure_ssl = false
# #    secret       = local.webhook_secret
#   }
#   active = false
#   events = ["push"]
# }
#-------------------------------------------------------------------
resource "aws_codestarconnections_connection" "codestarconnections-connection" {
  name          = "${local.default_name}-connection"
  provider_type = "GitHub"
}
#--------------------------------------------------------------------------------