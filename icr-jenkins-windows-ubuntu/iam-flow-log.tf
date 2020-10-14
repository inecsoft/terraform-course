#-----------------------------------------------------------------------------------------------
resource "aws_iam_role" "project_vpc_flowlogRole" {
  name = "project_vpc_flowlogRole"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "vpc-flow-logs.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#-----------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "project_vpc_flowlogPolicy" {
  name = "project_vpc_flowlogPolicy"
  role = "${aws_iam_role.project_vpc_flowlogRole.id}"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
EOF
}

#-----------------------------------------------------------------------------------------------