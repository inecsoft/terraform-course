 

data "aws_caller_identity" "source" {
  provider = aws.source
}

data "aws_caller_identity" "destination" {
  provider = aws.destination
}

output "source_id" {
  value = data.aws_caller_identity.source.id
}

data "aws_iam_policy_document" "assume_role" {
  provider = aws.destination
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.source.account_id}:root"]
    }
  }
}

data "aws_iam_policy" "ec2" {
  provider = aws.destination
  name     = "AmazonEC2FullAccess"
}

resource "aws_iam_role" "assume_role" {
  provider            = aws.destination
  name                = "assume_role"
  assume_role_policy  = data.aws_iam_policy_document.assume_role.json
  managed_policy_arns = [data.aws_iam_policy.ec2.arn]
}

output "cross-account-role-arn" {
  value = aws_iam_role.assume_role.arn
}
