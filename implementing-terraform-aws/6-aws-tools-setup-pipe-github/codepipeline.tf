###################################################
# CODE PIPELINE
###################################################

resource "aws_iam_role" "codepipeline_role" {
  name = "vpc-codepipeline-role-${random_integer.rand.result}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  name = "vpc-codepipeline_policy-${random_integer.rand.result}"
  role = aws_iam_role.codepipeline_role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "iam:PassRole"
      ],
      "Resource": "*",
      "Effect": "Allow",
      "Condition": {
          "StringEqualsIfExists": {
          "iam:PassedToService": [
          "cloudformation.amazonaws.com",
          "elasticbeanstalk.amazonaws.com",
          "ec2.amazonaws.com",
          "ecs-tasks.amazonaws.com"
          ]
        }
      }
    },
    {
      "Action": [
        "codecommit:CancelUploadArchive",
        "codecommit:GetBranch",
        "codecommit:GetCommit",
        "codecommit:GetUploadArchiveStatus",
        "codecommit:UploadArchive"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Action": [
        "elasticbeanstalk:*",
        "ec2:*",
        "elasticloadbalancing:*",
        "autoscaling:*",
        "cloudwatch:*",
        "s3:*",
        "sns:*",
        "cloudformation:*",
        "rds:*",
        "sqs:*",
        "ecs:*"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Action": [
        "codebuild:BatchGetBuilds",
        "codebuild:StartBuild"
      ],
      "Resource": "*"
    },
    {
      "Effect":"Allow",
      "Action": [
        "kms:DescribeKey",
        "kms:GenerateDataKey*",
        "kms:Encrypt",
        "kms:ReEncrypt*",
        "kms:Decrypt"
      ],
      "Resource": [
        "${aws_kms_key.kms-key.arn}"
      ]
    }
  ]
}
EOF
}

resource "aws_codepipeline" "codepipeline" {
  name     = "vpc-deploy-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.vpc_deploy_logs.bucket
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
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner  = "inecsoft"
        Repo   = github_repository.git-devops-go.name
        Branch = "master"
        OAuthToken = var.credentials.WEBHOOK_ACCESS_TOKEN
      }
    }
  }

  # stage {
  #   name = "Source"

  #   action {
  #     name             = "Source"
  #     category         = "Source"
  #     owner            = "AWS"
  #     provider         = "CodeCommit"
  #     version          = "1"
  #     output_artifacts = ["source_output"]

  #     configuration = {
  #       RepositoryName = aws_codecommit_repository.vpc_code.repository_name
  #       BranchName     = "master"
  #     }
  #   }
  # }

  stage {
    name = "Development"

    action {
      name             = "Plan"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["Development_plan_output"]
      version          = "1"
      run_order        = "1"

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
        EnvironmentVariables = jsonencode(
          [
            {
              name  = "TF_ACTION"
              value = "PLAN"
              type  = "PLAINTEXT"
            },
            {
              name  = "WORKSPACE_NAME"
              value = "dev"
              type  = "PLAINTEXT"
            }
          ]
        )
      }
    }

    action {
      name             = "Apply"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["Development_apply_output"]
      version          = "1"
      run_order        = "2"

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
        EnvironmentVariables = jsonencode(
          [
            {
              name  = "TF_ACTION"
              value = "APPLY"
              type  = "PLAINTEXT"
            },
            {
              name  = "WORKSPACE_NAME"
              value = "dev"
              type  = "PLAINTEXT"
            }
          ]
        )
      }
    }
  }
  ################### Uncomment after first deployment ###########################
  
  stage {
    name = "UAT"

    action {
      name             = "Plan"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["UAT_plan_output"]
      version          = "1"
      run_order        = "1"

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
        EnvironmentVariables = jsonencode(
          [
            {
              name  = "TF_ACTION"
              value = "PLAN"
              type  = "PLAINTEXT"
            },
            {
              name  = "WORKSPACE_NAME"
              value = "UAT"
              type  = "PLAINTEXT"
            }
          ]
        )
      }
    }

    action {
      name             = "Apply"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["UAT_apply_output"]
      version          = "1"
      run_order        = "2"

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
        EnvironmentVariables = jsonencode(
          [
            {
              name  = "TF_ACTION"
              value = "APPLY"
              type  = "PLAINTEXT"
            },
            {
              name  = "WORKSPACE_NAME"
              value = "UAT"
              type  = "PLAINTEXT"
            }
          ]
        )
      }
    }
  }

  stage {
    name = "Production"

    action {
      name             = "Plan"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["Production_plan_output"]
      version          = "1"
      run_order        = "1"

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
        EnvironmentVariables = jsonencode(
          [
            {
              name  = "TF_ACTION"
              value = "PLAN"
              type  = "PLAINTEXT"
            },
            {
              name  = "WORKSPACE_NAME"
              value = "prod"
              type  = "PLAINTEXT"
            }
          ]
        )
      }
    }

    action {
      name             = "Approve"
      category         = "Approval"
      owner            = "AWS"
      provider         = "Manual"
      input_artifacts  = []
      output_artifacts = []
      version          = "1"
      run_order        = "2"
    }

    action {
      name             = "Apply"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["source_output"]
      output_artifacts = ["Production_apply_output"]
      version          = "1"
      run_order        = "3"

      configuration = {
        ProjectName = aws_codebuild_project.build_project.name
        EnvironmentVariables = jsonencode(
          [
            {
              name  = "TF_ACTION"
              value = "APPLY"
              type  = "PLAINTEXT"
            },
            {
              name  = "WORKSPACE_NAME"
              value = "prod"
              type  = "PLAINTEXT"
            }
          ]
        )
      }
    }
  }

  ################################################################################
}
################################################################################
