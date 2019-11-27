#-------------------------------------------------------------
resource "aws_iam_role" "CloudwatchAgentServerRole" {
    name               = "CloudWatchAgentServerRole"
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
tags = {
  Name = "CloudwatchAgentServerRole" 
  Description = "IAM Role to Use for CloudwatchAgentServerRole Integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "CloudWatchAgentServerPolicy-policy-attachment" {
    name       = "CloudWatchAgentServerPolicy-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
    groups     = []
    users      = []
    roles      = ["${aws_iam_role.CloudwatchAgentServerRole.name}"]
    depends_on = ["aws_iam_role.CloudwatchAgentServerRole"]
}
#------------------------------------------------------------------
resource "aws_iam_instance_profile" "CloudwatchAgentServerRoleProfile" {
  name = "CloudwatchAgentServerRoleProfile"
  role = "${aws_iam_role.CloudwatchAgentServerRole.name}"
  depends_on = ["aws_iam_role.CloudwatchAgentServerRole"]
}
#------------------------------------------------------------------
