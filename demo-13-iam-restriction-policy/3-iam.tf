#---------------------------------------------------------------------------------------
resource "aws_iam_group" "iam-group-admin" {
  name = "${local.default_name}-developers"
  path = "/users/"
}
#---------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-RegionsRestriction" {
  statement {
    sid    = "RegionsRestriction"
    effect = "Deny"   
    not_actions = [
      "iam:*",
      "organazations:*",
      "route53:*",
      "budgets:*",
      "waf:*",
      "cloudfront:*",
      "globalaccelerator:*",
      "importexport:*",
      "support:*"
    ]

    resources = [
      "*",
    ]

    condition {
      test     = "StringNotEquals"
      variable = "aws:RequestedRegion"

      values = [
        "eu-west-1",
      ]
    }
  }

}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-RegionsRestriction" {
  name   = "${local.default_name}-iam-policy-RegionsRestriction"
  path   = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc-RegionsRestriction.json
  description = "when AWS rolls out new services if t tey are not in the list they can not be used withou a security review and exceptions added."

  tags = {
    name = "iam-policy-RegionsRestriction"
  }
}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-policy-attach-RegionsRestriction" {
  name       = "${local.default_name}-iam-policy-attach-RegionsRestriction"
  roles      = []
  groups     = [aws_iam_group.iam-group-admin.name]
  policy_arn = aws_iam_policy.iam-policy-RegionsRestriction.arn
}
#---------------------------------------------------------------------------------------
#---------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-RequireInstanceType" {
  statement {
    sid    = "RequireInstanceType"
    effect = "Deny"
    actions = [
      "ec2:RunInstances",
    ]

    resources = [
      "arn:aws:ec2:${var.AWS_REGION}::instance/*",
    ]

    condition {
      test     = "StringNotLike"
      variable = "ec2:InstanceType"

      values = [
        "*.nano",
        "*.micro",
        "*.small",
        "*.medium"
      ]
    }
  }

}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-RequireInstanceType" {
  name   = "${local.default_name}-iam-policy-RequireInstanceType"
  path   = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc-RequireInstanceType.json
}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-policy-attach-RequireInstanceType" {
  name       = "${local.default_name}-iam-policy-attach-RequireInstanceType"
  roles      = []
  groups     = [aws_iam_group.iam-group-admin.name]
  policy_arn = aws_iam_policy.iam-policy-RequireInstanceType.arn
}
#---------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-RequireEc2Tags" {
  statement {
    sid    = "RequireEc2Tags"
    effect = "Deny"
    actions = [
      "ec2:RunInstances",
      "ec2:CreateVolume",
    ]

    resources = [
      "arn:aws:ec2:${var.AWS_REGION}::instance/*",
      "arn:aws:ec2:${var.AWS_REGION}::volume/*",
    ]

    condition {
      test     = "Null"
      variable = "aws:RequestTag/Name"

      values = [
        "true"
      ]
    }
  }

}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy" "iam-policy-RequireEc2Tags" {
  name   = "${local.default_name}-iam-policy-RequireEc2Tags"
  path   = "/"
  policy = data.aws_iam_policy_document.iam-policy-doc-RequireEc2Tags.json
}
#---------------------------------------------------------------------------------------
resource "aws_iam_policy_attachment" "iam-policy-attach-RequireEc2Tags" {
  name       = "${local.default_name}-iam-policy-attach-RequireEc2Tags"
  roles      = []
  groups     = [aws_iam_group.iam-group-admin.name]
  policy_arn = aws_iam_policy.iam-policy-RequireEc2Tags.arn
}
#---------------------------------------------------------------------------------------