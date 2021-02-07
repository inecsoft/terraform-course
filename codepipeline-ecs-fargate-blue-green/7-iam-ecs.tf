#-------------------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-ecs-task-execution-role" {
  name = "${local.default_name}-iam-role-ecs-task-execution-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#-------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy" "iam-role-policy-ecs-task-execution-role" {
  name = "${local.default_name}-iam-role-policy-ecs-task-execution-role"
  role = aws_iam_role.iam-role-ecs-task-execution-role.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "ssm:GetParameters",
        "ssm:GetParameter"
      ],
      "Resource": "*"
    }
  ]
}
EOF
}
#-------------------------------------------------------------------------------------------------
resource "aws_iam_role" "iam-role-ecs-task-role" {
  name = "${local.default_name}-iam-role-ecs-task-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
#-------------------------------------------------------------------------------------------------
# 1.Store your sensitive information in either AWS Systems Manager Parameter Store or Secrets Manager.
# For AWS Systems Manager Parameter Store, run the following command:
# aws ssm put-parameter --type SecureString --name awsExampleParameter --value awsExampleValue
# For Secrets Manager, run the following command:
# aws secretsmanager create-secret --name awsExampleParameter --secret-string awsExampleValue
# "arn:aws:ssm:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:parameter/awsExampleParameter",
# "arn:aws:secretsmanager:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:secret:awsExampleParameter*"
#-------------------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-secretmanager" {
  name   = "${local.default_name}-iam-policy-secretmanager"
  path   = "/"
  policy = <<EOF
  {
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ssm:GetParameters",
        "secretsmanager:GetSecretValue", 
        "kms:Decrypt"
      ],
      "Resource": [
        "arn:aws:ssm:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:parameter/*",
        "arn:aws:secretsmanager:${var.AWS_REGION}:${data.aws_caller_identity.current.account_id}:secret:*"
      ]
    }
  ]
}
EOF
}
#-------------------------------------------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "iam-role-attach-policy-secretmanager" {
  role       = aws_iam_role.iam-role-ecs-task-execution-role.name
  policy_arn = aws_iam_policy.iam-policy-secretmanager.arn
}
#-------------------------------------------------------------------------------------------------