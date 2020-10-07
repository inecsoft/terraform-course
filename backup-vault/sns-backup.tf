#------------------------------------------------------------------------------------
resource "aws_sns_topic" "sns-topic" {
  name            = "${local.default_name}-backup-vault-events"
  display_name    = "${local.default_name}-backup-vault-events"

  tags = {
    Name = "${local.default_name}-backup-vault-events"
  }
}
#------------------------------------------------------------------------------------
data "aws_iam_policy_document" "sns-policy-doc" {
  policy_id = "__default_policy_ID"

  statement {
    actions = [
      "SNS:Publish",
    ]

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["backup.amazonaws.com"]
    }

    resources = [
      aws_sns_topic.sns-topic.arn,
    ]

    sid = "__default_statement_ID"
  }
}
#------------------------------------------------------------------------------------
resource "aws_sns_topic_policy" "sns-topic-policy" {
  arn    = aws_sns_topic.sns-topic.arn
  policy = data.aws_iam_policy_document.sns-policy-doc.json
}
#-------------------------------------------------------------------------------
resource "aws_sns_topic_subscription" "sns-topic" {
  #provider  = "aws.sns"
  topic_arn = aws_sns_topic.sns-topic.arn
  confirmation_timeout_in_minutes = 5
  #not supported
  #protocol  = "email"
  protocol  = "sms"
  endpoint  = "+447518527690"
  raw_message_delivery = false 
}
#-------------------------------------------------------------------------------
output "sns-topic" {
  value = aws_sns_topic.sns-topic.arn
}
#-------------------------------------------------------------------------------

#------------------------------------------------------------------------------------
resource "aws_backup_vault_notifications" "backup_vault-notify" {
  backup_vault_name   = aws_backup_vault.backup-vault.name
  sns_topic_arn       = aws_sns_topic.sns-topic.arn
  backup_vault_events = ["BACKUP_JOB_STARTED", "RESTORE_JOB_COMPLETED"]
}
#------------------------------------------------------------------------------------