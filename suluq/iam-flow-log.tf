#-----------------------------------------------------------------------------------------------
resource "aws_iam_role" "suluq_vpc_flowlogRole" {
  name = "${local.default_name}-vpc_flowlogRole"

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
resource "aws_iam_role_policy" "suluq_vpc_flowlogPolicy" {
  name = "${local.default_name}-vpc_flowlogPolicy"
  role = "${aws_iam_role.suluq_vpc_flowlogRole.id}"

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
