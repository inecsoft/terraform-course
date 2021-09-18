#--------------------------------------------------------------------------------
resource "aws_codebuild_project" "codebuild-project-dev" {
  name          = "${local.default_name}-codebuild-project-dev"
  description   = "${local.default_name}-codebuild-project-dev CodeBuild Project"
  build_timeout = "10"
  service_role  = aws_iam_role.iam-role-codebuild.arn

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/docker:18.09.0"
    #image          = "aws/codebuild/standard:4.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }

  source {
    type = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  artifacts {
    type = "CODEPIPELINE"
  }
  
  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }

    s3_logs {
      status   = "ENABLED"
      location = "${aws_s3_bucket.s3-bucket-codepipeline.id}/${local.default_name}-build-log"
    }
  }

  tags = {
    Name  = "${local.default_name}-codebuild-project-dev"
  }
}
#--------------------------------------------------------------------------------
resource "aws_codebuild_project" "codebuild-project-prod" {
  name          = "${local.default_name}-codebuild-project-prod"
  description   = "${local.default_name}-codebuild-project-prod CodeBuild Project"
  build_timeout = "10"
  service_role  = aws_iam_role.iam-role-codebuild.arn

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/docker:18.09.0"
    #image          = "aws/codebuild/standard:4.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }

  source {
    type = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }

  artifacts {
    type = "CODEPIPELINE"
  }
    
  logs_config {
    cloudwatch_logs {
      group_name  = "log-group"
      stream_name = "log-stream"
    }

    s3_logs {
      status   = "ENABLED"
      location = "${aws_s3_bucket.s3-bucket-codepipeline.id}/${local.default_name}-build-log"
    }
  }

  tags = {
    Name  = "${local.default_name}-codebuild-project-dev"
  }
}
#--------------------------------------------------------------------------------