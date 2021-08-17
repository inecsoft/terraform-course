#----------------------------------------------------------------------------------------------------
#
# kms
#
#----------------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "kms-key-policy" {
  policy_id = "key-default-1"
  statement {
    sid    = "Enable IAM User Permissions"
    effect = "Allow"
    principals {
      type        = "AWS"
      identifiers = ["arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"]
    }
    actions = [
      "kms:*",
    ]
    resources = [
      "*",
    ]
  }
}
#----------------------------------------------------------------------------------------------------
resource "aws_kms_key" "kms-key" {
  description = "kms key for demo artifacts"
  policy      = data.aws_iam_policy_document.kms-key-policy.json

  tags = {
    Name = "${local.default_name}-kms-key"
  }
}
#----------------------------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/demo-artifacts"
  target_key_id = aws_kms_key.kms-key.key_id
}
#----------------------------------------------------------------------------------------------------

