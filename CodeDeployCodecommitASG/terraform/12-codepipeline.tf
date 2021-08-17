# terraform import aws_codepipeline.foo example
#--------------------------------------------------------------------------------------------------
#resource "aws_codepipeline" "pipeline-codedeploy" {
#  name     = "pipeline-codedeploy"
# role_arn = "${aws_iam_role.codepipeline_role.arn}"
#}
#--------------------------------------------------------------------------------------------------
# aws_codepipeline.pipeline-codedeploy:
resource "aws_codepipeline" "pipeline-codedeploy" {
  name     = "${local.default_name}-pipeline"
  role_arn = aws_iam_role.CodePipelineServiceRole.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline-bucket.bucket
    type     = "S3"

    encryption_key {
      id   = aws_kms_alias.artifacts.arn
      type = "KMS"
    }
  }

  stage {
    name = "Source"

    action {
      category = "Source"
      configuration = {
        "BranchName"           = "master"
        "PollForSourceChanges" = "false"
        "RepositoryName"       = "${local.default_name}-repo"
      }
      input_artifacts = []
      name            = "Source"
      namespace       = "SourceVariables"
      output_artifacts = [
        "SourceArtifact",
      ]
      owner     = "AWS"
      provider  = "CodeCommit"
      region    = var.AWS_REGION
      run_order = 1
      version   = "1"
    }
  }
  stage {
    name = "Deploy"

    action {
      category = "Deploy"
      configuration = {
        "ApplicationName"     = "${local.default_name}-Application"
        "DeploymentGroupName" = "${local.default_name}-DeploymentGroup"
      }
      input_artifacts = [
        "SourceArtifact",
      ]
      name             = "Deploy"
      namespace        = "DeployVariables"
      output_artifacts = []
      owner            = "AWS"
      provider         = "CodeDeploy"
      region           = var.AWS_REGION
      run_order        = 1
      version          = "1"
    }
  }

  tags = {
    Name = "${local.default_name}-pipeline"
  }
}

#--------------------------------------------------------------------------------------------------
