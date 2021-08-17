#-------------------------------------------------------------
resource "aws_iam_role" "rds-iam-login" {
  name               = "rds-iam-login"
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
    Name        = "rds-iam-login"
    Description = "IAM Role to Use for RDS and EC2 Integration"
  }
}
#------------------------------------------------------------------------------
#Grant the IAM role for ec2 depends on
#db-user-name is the name of the database account to associate with IAM authentication.
#In the example policy, the database account is db_user.
#https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.IAMPolicy.html
#------------------------------------------------------------------------------
resource "aws_iam_policy" "AWS-rds-iam-role-policy" {
  name        = "AWS-rds-iam-role-for-ec2-policy"
  description = "AWS-rds-iam-role-for-ec2--policy"

  policy = <<EOF
{
   "Version": "2012-10-17",
   "Statement": [
      {
         "Effect": "Allow",
         "Action": [
             "rds-db:connect"
         ],
         "Resource": [
             "arn:aws:rds-db:eu-west-1:1234567890:dbuser:*/db-user-name"
         ]
      }
   ]
}
EOF
}
#-------------------------------------------------------------
resource "aws_iam_policy_attachment" "AWS-rds-iam-role-attachment" {
  name       = "AWS-rds-iam-role-attachment"
  policy_arn = aws_iam_policy.AWS-rds-iam-role-policy.arn
  groups     = []
  users      = []
  roles      = ["rds-iam-login"]
}
#-------------------------------------------------------------

