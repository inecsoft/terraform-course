#------------------------------------------------------------------
resource "aws_iam_role" "EC2InstanceRole" {
    name               = "EC2InstanceRole"
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
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AmazonEC2RoleforAWSCodeDeploy-policy-attachment" {
    name       = "AmazonEC2RoleforAWSCodeDeploy-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy"
    groups     = []
    users      = []
    roles      = ["EC2InstanceRole"]
}
#------------------------------------------------------------------
resource "aws_iam_role" "CodeDeployRole" {
    name               = "CodeDeployRole"
    description           = "Allows CodeDeploy to call AWS services such as Auto Scaling on your behalf."
    path               = "/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "codedeploy.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
    tags                  = {
        "Description" = "codedeploy service role for tutorial"
        "Name"        = "codedeploy service role"
    }
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWSCodeDeployRole-policy-attachment" {
    name       = "AWSCodeDeployRole-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSCodeDeployRole"
    groups     = []
    users      = []
    roles      = ["CodeDeployRole"]
}
#------------------------------------------------------------------
resource "aws_iam_role" "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy" {
    name               = "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy"
    path               = "/service-role/"
    assume_role_policy = <<POLICY
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
POLICY
}
#------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy-policy-attachment" {
    name       = "AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy-policy-attachment"
    policy_arn = "arn:aws:iam::895352585421:policy/service-role/AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy"
    groups     = []
    users      = []
    roles      = ["AWSCodePipelineServiceRole-eu-west-1-pipeline-codedeploy"]
}
#------------------------------------------------------------------

