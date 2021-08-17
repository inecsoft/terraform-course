#--------------------------------------------------------------------------------------
resource "aws_iam_role" "ApplicationHostInstanceRole" {
  name               = "${terraform.workspace}-ApplicationHostInstanceRole"
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
#--------------------------------------------------------------------------------------
resource "aws_iam_instance_profile" "ApplicationHostInstanceProfile" {
  name = "${terraform.workspace}-ApplicationHostInstanceProfile"
  path = "/"
  role = aws_iam_role.ApplicationHostInstanceRole.name
}
#--------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AmazonEC2RoleforSSM-policy-attachment" {
  name       = "${terraform.workspace}-AmazonEC2RoleforSSM-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
  groups     = []
  users      = []
  roles      = [aws_iam_role.ApplicationHostInstanceRole.name]
}
#--------------------------------------------------------------------------------------
resource "aws_iam_role" "SsmNotificationRole" {
  name               = "${terraform.workspace}-SsmNotificationRole"
  path               = "/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "ssm.amazonaws.com",
          "ec2.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}

#--------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "SsmNotificationRole" {
  name = "${terraform.workspace}-cloudtrail-limited-actions"
  role = aws_iam_role.SsmNotificationRole.name

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sns:Publish",
      "Resource": "${aws_sns_topic.SsmNotificationTopic.arn}",
      "Effect": "Allow",
      "Sid": "AllowSnsTopicPost"
    }
  ]
}
POLICY
}
#-------------------------------------------------------------------------------------------