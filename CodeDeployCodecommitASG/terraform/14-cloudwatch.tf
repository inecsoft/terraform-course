#----------------------------------------------------------------------------------------------
resource "aws_cloudwatch_log_group" "cloudwatch-pipeline" {
  name              = "/aws/lambda/pipeline"
  retention_in_days = 14
  
  #kms_key_id        = aws_kms_key.artifacts.arn
  
  tags              = {
    Name =  "${local.default_name}-pipeline"
  }
}
#----------------------------------------------------------------------------------------------
#terraform import aws_cloudwatch_event_rule.cwe-rule-pipeline name
#----------------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_rule" "cwe-rule-pipeline" {
  name        = "${local.default_name}-cwe-rule-pipeline"
  description = "Amazon CloudWatch Events rule to automatically start your pipeline when a change occurs in the AWS CodeCommit source repository and branch. Deleting this may prevent changes from being detected in that pipeline"
  
  role_arn      = aws_iam_role.cloudwatch-event-pipeline-role.arn
  is_enabled    = true
  
  event_pattern = <<EOF
{
  "source": [
    "aws.codecommit"
  ],
  "detail-type": [
    "CodeCommit Repository State Change"
  ],
  "resources": [
    "${aws_codecommit_repository.codecommit-repo.arn}"
  ],
  "detail": {
    "event": [
      "referenceCreated",
      "referenceUpdated"
    ],
    "referenceType": [
      "branch"
    ],
    "referenceName": [
      "master"
    ]
  }
}
EOF

  tags  = {
    Name  =  "${local.default_name}-cwe-rule-pipeline"
  }
}
#----------------------------------------------------------------------------------------------
resource "aws_cloudwatch_event_target" "cwe-target-pipeline" {
  target_id =  "CodePipeline"
  arn       = aws_codepipeline.pipeline-codedeploy.arn

  rule      = aws_cloudwatch_event_rule.cwe-rule-pipeline.name
  role_arn  = aws_iam_role.cloudwatch-event-pipeline-role.arn

}
#----------------------------------------------------------------------------------------------
#terraform state show
#----------------------------------------------------------------------------------------------

