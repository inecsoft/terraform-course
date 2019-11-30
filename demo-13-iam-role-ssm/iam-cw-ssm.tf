#-------------------------------------------------------------
resource "aws_iam_role" "CW-SSM-Server" {
    name               = "CW-SSM-Server"
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
  Name = "CW-SSM-Server" 
  Description = "IAM Role authorizes the instance to be use by SSM. Provides CloudWatch and SSM integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "CW-SSM-Server-policy-attachment" {
    name       = "CW-SSM-Server-policy-attachment"
    depends_on = [aws_iam_role.CW-SSM-Server]
    policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
    groups     = []
    users      = []
    roles      = ["CW-SSM-Server"]
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "AmazonEC2RoleforSSM-policy-attachment" {
    name       = "AmazonEC2RoleforSSM-policy-attachment"
    depends_on = [aws_iam_role.CW-SSM-Server]
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforSSM"
    groups     = []
    users      = []
    roles      = ["CW-SSM-Server"]
}
#-------------------------------------------------------------
resource "aws_iam_instance_profile" "RCW-SSM-ServeriRoleProfile" {
  name = "RCW-SSM-ServerRoleProfile"
  role = "${aws_iam_role.RCW-SSM-Server.name}"
  depends_on = ["aws_iam_role.RCW-SSM-Server"]
}
#------------------------------------------------------------------
