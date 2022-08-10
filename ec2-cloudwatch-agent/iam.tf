	#-------------------------------------------------------------
resource "aws_iam_role" "CloudWatchAgent-ssmServerRole" {
  name               = "CloudWatchAgent-ssmServerRole"
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
    Name        = "CloudWatchAgent-ssmServerRole"
    Description = "IAM Role to Use for CloudWatchAgent-ssmServerRole Integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "CloudWatchAgentServerRolePolicy-policy-attachment" {
  name       = "CloudWatchAgent-ssmServerRolePolicy-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy"
  groups     = []
  users      = []
  roles      = [ aws_iam_role.CloudWatchAgent-ssmServerRole.name ]
  depends_on = [ aws_iam_role.CloudWatchAgent-ssmServerRole ]
}

resource "aws_iam_policy_attachment" "ssmServerRolePolicy-policy-attachment" {
  name       = "ssmServerRolePolicy-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
  groups     = []
  users      = []
  roles      = [aws_iam_role.CloudWatchAgent-ssmServerRole.name]
  depends_on = [aws_iam_role.CloudWatchAgent-ssmServerRole]
}

#------------------------------------------------------------------
resource "aws_iam_instance_profile" "CloudWatchAgent-ssmServerRoleProfile" {
  name       = "CloudWatchAgent-ssmServerRoleProfile"
  role       = aws_iam_role.CloudWatchAgent-ssmServerRole.name
  depends_on = [aws_iam_role.CloudWatchAgent-ssmServerRole]
}
#------------------------------------------------------------------