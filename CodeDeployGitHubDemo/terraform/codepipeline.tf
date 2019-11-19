# terraform import aws_codepipeline.foo example

#resource "aws_codepipeline" "pipeline-codedeploy" {
#  name     = "pipeline-codedeploy"
 # role_arn = "${aws_iam_role.codepipeline_role.arn}"
#}

# aws_codepipeline.pipeline-codedeploy:
resource "aws_codepipeline" "pipeline-codedeploy" {
    name     = "pipeline-codedeploy"
    role_arn = "${aws_iam_role.AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy.arn}"
    tags     = {}

    artifact_store {
        location = "${aws_s3_bucket.codepipeline-eu-west-1-620136413607.bucket}"
        type     = "S3"
    }

    stage {
        name = "Source"

        action {
            category         = "Source"
            configuration    = {
                "BranchName"           = "master"
                "PollForSourceChanges" = "false"
                "RepositoryName"       = "app-node-prod"
            }
            input_artifacts  = []
            name             = "Source"
            output_artifacts = [
                "SourceArtifact",
            ]
            owner            = "AWS"
            provider         = "CodeCommit"
            run_order        = 1
            version          = "1"
        }
    }
    stage {
        name = "Deploy"

        action {
            category         = "Deploy"
            configuration    = {
                "ApplicationName"     = "DemoApplication"
                "DeploymentGroupName" = "DemoDeploymentGroup"
            }
            input_artifacts  = [
                "SourceArtifact",
            ]
            name             = "Deploy"
            output_artifacts = []
            owner            = "AWS"
            provider         = "CodeDeploy"
            run_order        = 1
            version          = "1"
        }
    }
}

