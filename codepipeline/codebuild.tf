#--------------------------------------------------------------------------------------------------
# code build
#--------------------------------------------------------------------------------------------------
resource "aws_codebuild_project" "codepipeline" {
  name           = "docker-build"
  description    = "codepipeline docker build"
  build_timeout  = "30"
  service_role   = aws_iam_role.codebuild.arn
  encryption_key = aws_kms_alias.artifacts.arn

  artifacts {
    type = "CODEPIPELINE"
  }

  #The type of storage that will be used for the AWS CodeBuild project cache
  #values: NO_CACHE, LOCAL, and S3
  #cache {
  #  type     = "S3"
  #  location = aws_s3_bucket.codebuild-cache.bucket
  #}

  #compute_type: BUILD_GENERAL1_SMALL, BUILD_GENERAL1_MEDIUM, BUILD_GENERAL1_LARGE
  #https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-available.html
  #image for dotnet  Amazon Linux 2 standard:3.0; Ubuntu standard:4.0
  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/docker:18.09.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true

    environment_variable {
      name  = "AWS_DEFAULT_REGION"
      value = var.AWS_REGION
    }
    environment_variable {
      name  = "AWS_ACCOUNT_ID"
      value = data.aws_caller_identity.current.account_id
    }
    environment_variable {
      name  = "IMAGE_REPO_NAME"
      value = aws_ecr_repository.codepipeline.name
    }
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  #depends_on      = [aws_s3_bucket.codebuild-cache]
}
#--------------------------------------------------------------------------------------------------
