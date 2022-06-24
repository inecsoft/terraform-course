resource "aws_iam_user" "cross-account-user" {
  name = "cross-account-user"
  provider = aws.log-dev-beenetwork

  tags = {
    Name = "cross-account-user"
  }
}

resource "aws_iam_policy" "prod_s3" {
  name        = "prod_s3"
  description = "allow assuming prod_s3 role"
  provider    = aws.tfgm

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
    {
        Effect   = "Allow",
        Action   = "sts:AssumeRole",
        Resource = "arn:aws:iam::${data.aws_caller_identity.prod.account_id}:role/${aws_iam_role.prod_list_s3.name}"
    }]
  })

  tags = {
    "Name" = "prod_s3"
  }
}
 
resource "aws_iam_user_policy_attachment" "prod_s3" {
  user       = aws_iam_user.cross-account-user.name
  policy_arn = aws_iam_policy.prod_s3.arn
  provider   = aws.tfgm
}
#############################################################################################
resource "aws_iam_role" "prod_list_s3" {
  name = "s3-list-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect    = "Allow",
        Action    = "sts:AssumeRole",
        Principal = { "AWS" : "arn:aws:iam::${data.aws_caller_identity.log-dev-beenetwork.account_id}:root" }
    }]
  })
  provider = aws.tfgm
}

resource "aws_iam_policy" "s3_list_all" {
  name        = "s3_list_all"
  description = "allows listing all s3 buckets"
  #policy      = file("role_permissions_policy.json")
  policy =  data.aws_iam_policy_document.s3_list_all_policy_doc.json

  provider = aws.tfgm

  tags = {
    "Name" = "s3_list_all"
  }
}
 
data "aws_iam_policy_document" "s3_list_all_policy_doc" {
  provider = aws.tfgm

  statement {
    effect = "Allow"
    actions = [
      "s3:ListAllMyBuckets",
    ]
    resources = [
      "*",
    ]

  }
}

resource "aws_iam_policy_attachment" "s3_list_all_policy_attach" {
  name       = "list s3 buckets policy to role"
  roles      = [ aws_iam_role.prod_list_s3.name ]
  policy_arn = aws_iam_policy.s3_list_all.arn
  provider   = aws.tfgm
}