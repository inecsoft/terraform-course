#----------------------------------------------------------------------------------------
# IAM role which dictates what other AWS services the Lambda function
# may access.
#----------------------------------------------------------------------------------------
#----------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-lambda-getinventory" {
  name = "${local.default_name}-iam-role-lambda-getinventory"

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
resource "aws_iam_policy_attachment" "iam-role-policy-attach-vpc-getinventory" {
  name       = "${local.default_name}-lambda-getinventory-function-role-attachment"
  users      = []
  roles      = [ aws_iam_role.iam-role-lambda-getinventory.name ]
  groups     = []
  policy_arn = data.aws_iam_policy.iam-policy-vpc-getinventory.arn
}
#---------------------------------------------------------------------
data "aws_iam_policy" "iam-policy-vpc-getinventory" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}
#--------------------------------------------------------------------------------------
#--------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-role-lambda-getinventory-kms" {
  name = "${local.default_name}-iam-policy-role-lambda-getinventory-kms"
  path = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc-role-getinventory-kms.json
}
#--------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-role-policy-lambda-getinventory-kms" {
  name       = "${local.default_name}-iam-role-policy-lambda-getinventory-kms"
  users      = []
  roles      = [ aws_iam_role.iam-role-lambda-getinventory.name ]
  groups     = []
  policy_arn = aws_iam_policy.iam-policy-role-lambda-getinventory-kms.arn
}
#--------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-role-getinventory-kms" {
  statement {
    sid = "${var.stage_name}IamPolicyDocRolegetinventorykms"
    effect = "Allow"
    actions = [
      "kms:Decrypt"
    ]
    resources = [
      "*",
    ]
  }

}
#--------------------------------------------------------------------------------------