#----------------------------------------------------------------

#----------------------------------------------------------------
resource "aws_backup_vault" "backup-vault" {
  name        = "${local.default_name}-backup-vault"
  #kms_key_arn = aws_kms_key.example.arn
  
  tags = {
    Name = "${local.default_name}-backup-vault"
  }
}
#----------------------------------------------------------------
resource "aws_backup_plan" "backup-plan" {
  name = "${local.default_name}-backup-vault"

  rule {
    rule_name         = "${local.default_name}-backup-vault-rule"
    target_vault_name = aws_backup_vault.backup-vault.name
    schedule          = "cron(0 12 * * ? *)"
    start_window        = 60
    completion_window   = 180
    lifecycle {
      delete_after = 60
    }
    recovery_point_tags = {
      Name = "${local.default_name}-backup-plan-recovered"
    }
  }

  tags = {
    Name = "${local.default_name}-backup-plan"
  }
}
#----------------------------------------------------------------
resource "aws_iam_role" "backup-role" {
  name               = "${local.default_name}-backup-role"
  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": ["sts:AssumeRole"],
      "Effect": "allow",
      "Principal": {
        "Service": ["backup.amazonaws.com"]
      }
    }
  ]
}
POLICY
}
#----------------------------------------------------------------
resource "aws_iam_role_policy_attachment" "backup-role-attach" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSBackupServiceRolePolicyForBackup"
  role       = aws_iam_role.backup-role.name
}
#----------------------------------------------------------------
resource "aws_backup_selection" "backup-selection" {
  name         = "${local.default_name}-backup-selection"
  iam_role_arn = aws_iam_role.backup-role.arn
  
  plan_id      = aws_backup_plan.backup-plan.id

  #Selecting Backups By Resource
  resources = [
    aws_instance.instance.arn,
    #aws_db_instance.instance.arn,
    #aws_ebs_volume.example.arn,
    #aws_ebs_volume.ebs-volume-1.arn,
    #aws_efs_file_system.example.arn,
  ]

  #Selecting Backups By Tag
  # selection_tag  {
  #   type  = "STRINGEQUALS"
  #   key   = "Name"
  #   value = "${local.default_name}-extra volume data"
  # }
}
#----------------------------------------------------------------
