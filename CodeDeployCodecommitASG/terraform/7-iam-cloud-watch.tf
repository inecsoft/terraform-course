#------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "cloudwatch-event-pipeline-role" {
    name               = "${local.default_name}-cloudwatch-event-pipeline"
    path               = "/service-role/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "events.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#------------------------------------------------------------------------------------------------------
resource "aws_iam_policy" "start-pipeline-execution-policy" {
    name        = "${local.default_name}-start-pipeline-execution-policy"
    path        = "/service-role/"
    description = "Allows Amazon CloudWatch Events to automatically start a new execution in the ${local.default_name} pipeline when a change occurs"
    policy      = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "codepipeline:StartPipelineExecution"
      ],
      "Resource": [
        "${aws_codepipeline.pipeline-codedeploy.arn}"
      ]
    }
  ]
}
POLICY
}
#------------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "start-pipeline-execution-policy-attachment" {
    name       = "${local.default_name}-policy-attach-CodePipelineServiceRole"
    policy_arn = aws_iam_policy.start-pipeline-execution-policy.arn
    groups     = []
    users      = []
    roles      = [aws_iam_role.cloudwatch-event-pipeline-role.name]
    depends_on = [aws_iam_role.cloudwatch-event-pipeline-role]
}
#------------------------------------------------------------------------------------------------------