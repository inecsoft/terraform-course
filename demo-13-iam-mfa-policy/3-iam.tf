#---------------------------------------------------------------------------------------
resource "aws_iam_group" "iam-group-admin" {
  name = "${local.default_name}-developers"
  path = "/users/"
}
#---------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc" {
  statement {
    sid     = "allowDeleteIfMfaIsAnabled"
    effect  = "Allow"
    actions = [
      "ec2:TerminateInstances",
    ]

    resources = [
      "arn:aws:ec2:${var.AWS_REGION}::instance/*",
    ]

    condition {
      test     = "BoolIfExists"
      variable = "aws:MultifactorAuthPresent"

      values = [
        "true",
      ]
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
  name = "${local.default_name}-iam-policy-attach"
  roles = [ ]
  groups = [ aws_iam_group.iam-group-admin.name ]
  policy_arn = aws_iam_policy.iam-policy.arn
}
#---------------------------------------------------------------------------------------