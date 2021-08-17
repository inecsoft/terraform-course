#-------------------------------------------------------------------
resource "aws_iam_instance_profile" "iam-instance-profile" {
  name = "${local.default_name}-iam-instance-profile"
  role = aws_iam_role.iam-ec2-role.name
}
#-------------------------------------------------------------------
resource "aws_iam_policy" "iam-role-policy" {
  name        = "${local.default_name}-iam-role-policy"
  path        = "/"
  description = "iam role policy"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:DescribeKey"
      ],
      "Resource": [
        "${aws_kms_key.kms-key.arn}"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetBucketLocation",
        "s3:ListAllMyBuckets"
      ],
      "Resource": "arn:aws:s3:::*"
    },
    {
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_s3_bucket.s3-bucket-mount.arn}",
        "${aws_s3_bucket.s3-bucket-mount.arn}/*"
      ]
    }
  ]
}
EOF
}
#-------------------------------------------------------------------
resource "aws_iam_role" "iam-ec2-role" {
  name = "${local.default_name}-iam-ec2-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF

  tags = {
    Name = "${local.default_name}-iam-ec2-role"
  }
}
#-------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-ec2-role-policy-attach" {
  name       = "${local.default_name}-iam-ec2-role-policy-attach"
  users      = []
  roles      = [aws_iam_role.iam-ec2-role.name]
  groups     = []
  policy_arn = aws_iam_policy.iam-role-policy.arn
}
#-------------------------------------------------------------------

