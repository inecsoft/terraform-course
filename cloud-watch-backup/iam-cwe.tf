
#------------------------------------------------------------------------------------------------------
resource "aws_iam_role" "cwe-role" {
    name               = "${local.default_name}-cwe-role-backup"
    description        = "AWS_Events_Invoke_Action_On_EBS_Volume_gitlabbackup role backup"
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

  tags  = {
    Name = "${local.default_name}-cwe-role-backup"
  }
}
#------------------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "cwe-policy-attachment" {
    name       = "${local.default_name}-cwe-policy-attachment"
    policy_arn = aws_iam_policy.cwe-policy.arn
    groups     = []
    users      = []
    roles      = [ aws_iam_role.cwe-role.name ]
}
#------------------------------------------------------------------------------------------------------
resource "aws_iam_policy" "cwe-policy" {
    name        = "${local.default_name}-cwe-policy"
    path        = "/service-role/"
    description = "AWS_Events_Invoke_Action_On_EBS_Volume_gitlabbackup"
    policy      = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchEventsBuiltInTargetExecutionAccess",
      "Effect": "Allow",
      "Action": [
        "ec2:CreateSnapshot"
      ],
      "Resource": [
        "*"
      ]
    }
  ]
}
POLICY
}
#------------------------------------------------------------------------------------------------------