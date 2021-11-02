#-------------------------------------------------------------
resource "aws_iam_role" "jenkinsaccess" {
  name               = "jenkinsaccess"
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
    Name        = "jenkins"
    Description = "IAM Role to Use for Jenkins Integration"
  }
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWSCodePipelineCustomActionAccess-policy-attachment" {
  name       = "AWSCodePipelineCustomActionAccess-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/AWSCodePipelineCustomActionAccess"
  groups     = []
  users      = []
  roles      = ["jenkinsaccess"]
}

#-------------------------------------------------------------

