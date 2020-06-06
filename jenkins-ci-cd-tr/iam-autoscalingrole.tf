resource "aws_iam_role" "AWSServiceRoleForAutoScaling" {
    name               = "AWSServiceRoleForAutoScaling"
    path               = "/aws-service-role/autoscaling.amazonaws.com/"
    assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "autoscaling.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
