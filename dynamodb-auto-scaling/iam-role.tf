
#----------------------------------------------------------------------------------------------
resource "aws_iam_role" "AWSServiceRoleForApplicationAutoScaling_DynamoDBTable" {
  name               = "${local.default_name}-AWSServiceRoleForApplicationAutoScaling_DynamoDBTable"
  path               = "/aws-service-role/dynamodb.application-autoscaling.amazonaws.com/"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "dynamodb.application-autoscaling.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
POLICY
}
#----------------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWSApplicationAutoscalingDynamoDBTablePolicy-policy-attachment" {
  name       = "${local.default_name}-AWSApplicationAutoscalingDynamoDBTablePolicy-policy-attachment"
  policy_arn = "arn:aws:iam::aws:policy/aws-service-role/AWSApplicationAutoscalingDynamoDBTablePolicy"
  groups     = []
  users      = []
  roles      = [aws_iam_role.AWSServiceRoleForApplicationAutoScaling_DynamoDBTable.name]
}
#----------------------------------------------------------------------------------------------