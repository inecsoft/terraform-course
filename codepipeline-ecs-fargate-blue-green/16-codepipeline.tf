#-------------------------------------------------------------------------------------------------
# codepipeline - demo
#-------------------------------------------------------------------------------------------------
resource "aws_codepipeline" "codepipeline" {
  name     = "${local.default_name}-pipeline"
  role_arn = aws_iam_role.iam-role-codepipeline.arn

  artifact_store {
    location = aws_s3_bucket.s3-bucket-artifacts.bucket
    type     = "S3"
    encryption_key {
      id   = aws_kms_alias.kms-key-alias.arn
      type = "KMS"
    }
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "CodeCommit"
      version          = "1"
      output_artifacts = ["${local.default_name}-docker-source"]

      configuration = {
        RepositoryName = aws_codecommit_repository.codecommit-repo.repository_name
        BranchName     = "master"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["${local.default_name}-docker-source"]
      output_artifacts = ["${local.default_name}-docker-build"]
      version          = "1"

      configuration = {
        ProjectName = aws_codebuild_project.codebuild-project.name
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "DeployToECS"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "CodeDeployToECS"
      input_artifacts = ["${local.default_name}-docker-build"]
      version         = "1"

      configuration = {
        ApplicationName                = aws_codedeploy_app.codedeploy-app.name
        DeploymentGroupName            = aws_codedeploy_deployment_group.codedeploy-deployment-group.deployment_group_name
        TaskDefinitionTemplateArtifact = "${local.default_name}-docker-build"
        AppSpecTemplateArtifact        = "${local.default_name}-docker-build"
      }
    }
  }
}
#-------------------------------------------------------------------------------------------------

