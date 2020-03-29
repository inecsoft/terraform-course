#-------------------------------------------------------------------------------------------
# kms provides encryption at rest
#-------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "artifacts-kms-policy" {
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
#-------------------------------------------------------------------------------------------
resource "aws_kms_key" "artifacts" {
  description = "kms key for codepipeline artifacts"
  policy      = data.aws_iam_policy_document.artifacts-kms-policy.json
}
#-------------------------------------------------------------------------------------------
resource "aws_kms_alias" "artifacts" {
  name          = "alias/artifacts"
  target_key_id = aws_kms_key.artifacts.key_id
}
#-------------------------------------------------------------------------------------------