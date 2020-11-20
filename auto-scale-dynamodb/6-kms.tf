#-------------------------------------------------------------------------------------------
# kms provides encryption at rest
#-------------------------------------------------------------------------------------------
data "aws_iam_policy_document" "iam-policy-doc-kms" {
  policy_id = "iam-policy-doc-kms"
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
resource "aws_kms_key" "kms-key" {
  description = "kms key for auto scale dynamodb"
  policy      = data.aws_iam_policy_document.iam-policy-doc-kms.json
}
#-------------------------------------------------------------------------------------------
resource "aws_kms_alias" "kms-key-alias" {
  name          = "alias/${local.default_name}-autoscaledynamodb"
  target_key_id = aws_kms_key.kms-key.key_id
}
#-------------------------------------------------------------------------------------------