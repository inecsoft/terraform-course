#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-lambda-getorderstatus" {
  name = "${local.default_name}-iam-role-lambda-getorderstatus"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
#---------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-attach-vpc-getorderstatus" {
  name       = "${local.default_name}-lambda-getorderstatus-function-role-attachment"
  users      = []
  roles      = [aws_iam_role.iam-role-lambda-getorderstatus.name]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-policy-vpc-getorderstatus.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-policy-vpc-getorderstatus" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#--------------------------------------------------------------------------------------
