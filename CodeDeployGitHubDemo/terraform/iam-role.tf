
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


resource "aws_iam_policy_attachment" "AmazonEC2RoleforAWSCodeDeploy-policy-attachment" {
    name       = "AmazonEC2RoleforAWSCodeDeploy-policy-attachment"
    policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2RoleforAWSCodeDeploy"
    groups     = []
    users      = []
    roles      = ["EC2InstanceRole"]
}

