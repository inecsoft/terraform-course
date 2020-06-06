#--------------------------------------------------------------------------------------------------------------------
resource "aws_codebuild_project" "code-build" {
    name           = "${local.default_name}-jenkins"
    description    = "A description about my project"
    badge_enabled  = false
    build_timeout  = 60
    encryption_key = "arn:aws:kms:eu-west-1:230941810881:alias/aws/s3"
    queued_timeout = 480
    service_role   = aws_iam_role.CodeBuildRole.arn

    tags           = {
      Env = terraform.workspace
    }

    artifacts {
        encryption_disabled    = true
        location               = aws_s3_bucket.jenkins-codedeploybucket.id
        name                   = "codebuild-artifact.zip"
        namespace_type         = "NONE"
        override_artifact_name = false
        packaging              = "ZIP"
        type                   = "S3"
    }

    cache {
        modes = []
        type  = "NO_CACHE"
    }

    environment {
        compute_type                = "BUILD_GENERAL1_SMALL"
        image                       = "aws/codebuild/ubuntu-base:14.04"
        image_pull_credentials_type = "CODEBUILD"
        privileged_mode             = false
        type                        = "LINUX_CONTAINER"
    }

#    source {
#        git_clone_depth     = 1
#        insecure_ssl        = false
#        location            = "https://github.com/inecsoft/terraform-course/tree/master/webapi"
#        report_build_status = false
#        type                = "GITHUB"
#
#        git_submodules_config {
#            fetch_submodules = false
#        }
#    }

    source {
        git_clone_depth     = 0
        insecure_ssl        = false
        location            = "${aws_s3_bucket.jenkins-codedeploybucket.id}/test"
        report_build_status = false
        type                = "S3"
    }
}
#--------------------------------------------------------------------------------------------------------------------

