#--------------------------------------------------------------------------------
#https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-pipeline-structure.html
#--------------------------------------------------------------------------------
resource "aws_codepipeline" "codepipeline" {
  name     = "${local.default_name}-pipeline"
  role_arn = aws_iam_role.iam-role-codepipeline.arn

  artifact_store {
    location = aws_s3_bucket.s3-bucket-codepipeline.bucket 
    type     = "S3"

    encryption_key {
      id   = aws_kms_alias.kms-key-alias.arn
      type = "KMS"
    }
  }

  # stage {
  #   name = "Source"

  #   action {
  #     name             = "Source"
  #     category         = "Source"
  #     owner            = "AWS"
  #     provider         = "CodeStarSourceConnection"
  #     version          = "1"
  #     output_artifacts = ["source_output"]

  #     configuration = {
  #       ConnectionArn    = aws_codestarconnections_connection.codestarconnections-connection.arn
  #       FullRepositoryId = "inecsoft/${github_repository.git-devops-go.name}"
  #       BranchName       = "master"
  #     }
  #   }
  # }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner      = "inecsoft"
        Repo       = github_repository.git-devops-go.name
        Branch     = "master"
        OAuthToken = data.aws_ssm_parameter.ssm-parameter-webhook-access-token.value
      }
    }
  }

  # stage {
  #     name = "Build"

  #     action {
  #         name             = "Build"
  #         category         = "Build"
  #         owner            = "AWS"
  #         provider         = "CodeBuild"
  #         input_artifacts  = ["source_output"]
  #         output_artifacts = ["build_output"]
  #         version          = "1"

  #         configuration = {
  #             ProjectName = aws_codebuild_project.codebuild-project-prod.name
  #         }
  #     }
  # }

  stage {
    name = "Manual-Approval"

    action {
      name             = "Manual-Approval"
      category         = "Approval"
      owner            = "AWS"
      provider         = "Manual"
      run_order        = 1
      version          = "1"

      configuration = {
        CustomData        = "Comments on the manual approval"
        NotificationArn   =  aws_sns_topic.sns-topic-deploy.arn
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name             = "Deploy"
      category         = "Deploy"
      owner            = "AWS"
      provider         = "CodeDeploy"
      input_artifacts  = ["source_output"]
      #input_artifacts = ["build_output"]
      version          = "1"
      region           = var.AWS_REGION

      configuration = {
        # ActionMode     = "REPLACE_ON_FAILURE"
        # Capabilities   = "CAPABILITY_AUTO_EXPAND,CAPABILITY_IAM"
        ApplicationName                = aws_codedeploy_app.codedeploy-app-lambda.name
        DeploymentGroupName            = aws_codedeploy_deployment_group.codedeploy-deployment-group.deployment_group_name
        # TaskDefinitionTemplateArtifact = "build_output"
        # AppSpecTemplateArtifact        = "build_output"
      }
    }
  }
}
#--------------------------------------------------------------------------------
