
# aws ec2 describe-images \
#     --owners 309956199498 \
#     --query 'Images[*].[CreationDate,Name,ImageId]' \
#     --filters "Name=name,Values=RHEL-7.?*GA*" \
#     --region us-east-1 \
#     --output table \
#   | sort -r
#---------------------------------------------------------------------------------------
resource "aws_iam_group" "iam-group-developer" {
  name = "${local.default_name}-developers"
  path = "/users/"
}
#---------------------------------------------------------------------------------------

data "aws_iam_policy_document" "iam-policy-doc" {
  statement {
    sid       = "AllowListActions"
    effect    = "Allow"
    resources = ["*"]

    actions = [
      "iam:ListUsers",
      "iam:ListVirtualMFADevices",
    ]
  }

  statement {
    sid    = "AllowIndividualUserToListOnlyTheirOwnMFA"
    effect = "Allow"

    resources = [
      "arn:aws:iam::*:mfa/*",
      "arn:aws:iam::*:user/$${aws:username}",
    ]

    actions = ["iam:ListMFADevices"]
  }

  statement {
    sid    = "AllowIndividualUserToManageTheirOwnMFA"
    effect = "Allow"

    resources = [
      "arn:aws:iam::*:mfa/$${aws:username}",
      "arn:aws:iam::*:user/$${aws:username}",
    ]

    actions = [
      "iam:CreateVirtualMFADevice",
      "iam:DeleteVirtualMFADevice",
      "iam:EnableMFADevice",
      "iam:ResyncMFADevice",
    ]
  }

  statement {
    sid    = "AllowIndividualUserToDeactivateOnlyTheirOwnMFAOnlyWhenUsingMFA"
    effect = "Allow"

    resources = [
      "arn:aws:iam::*:mfa/$${aws:username}",
      "arn:aws:iam::*:user/$${aws:username}",
    ]

    actions = ["iam:DeactivateMFADevice"]

    condition {
      test     = "Bool"
      variable = "aws:MultiFactorAuthPresent"
      values   = ["true"]
    }
  }

  statement {
    sid       = "AllowIndividualUserToDeactivateOnlyTheirOwnKeysWhenUsingMFA"
    effect    = "Allow"
    resources = ["arn:aws:iam::*:user/$${aws:username}"]

    actions = [
      "iam:DeleteAccessKey",
      "iam:GetAccessKeyLastUsed",
      "iam:UpdateAccessKey",
      "iam:CreateAccessKey",
      "iam:ListAccessKeys",
    ]

    condition {
      test     = "Bool"
      variable = "aws:MultiFactorAuthPresent"
      values   = ["true"]
    }
  }
}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy" {
  name   = "${local.default_name}-iam-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc.json
}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-policy-attach" {
  name       = "${local.default_name}-iam-policy-attach"
  roles      = []
  groups     = [ aws_iam_group.iam-group-developer.name ]
  policy_arn = aws_iam_policy.iam-policy.arn
}
#---------------------------------------------------------------------------------------
